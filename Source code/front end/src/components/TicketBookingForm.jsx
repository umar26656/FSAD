import React, { useState } from "react";
import "./ComponentStyles.css";

const TicketBookingForm = ({ eventId, availableTickets, onBookSuccess }) => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    department: "",
    ticketsBooked: 1,
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const departments = ["Computer Science", "Electrical", "Mechanical", "Civil", "Management", "Other"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear error when typing
  };

  const validateForm = () => {
    if (!formData.userName || !formData.email || !formData.department) {
      return "All fields are required.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return "Enter a valid email address.";
    }
    if (formData.ticketsBooked < 1) {
      return "Number of tickets must be at least 1.";
    }
    if (formData.ticketsBooked > availableTickets) {
      return `Only ${availableTickets} tickets are available.`;
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    try {
      await onBookSuccess({
        ...formData,
        ticketsBooked: Number(formData.ticketsBooked),
        eventId,
      });
      // Reset form on success is handled by unmounting or resetting parent state
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      userName: "",
      email: "",
      department: "",
      ticketsBooked: 1,
    });
    setError("");
  };

  if (availableTickets <= 0) {
    return (
      <div className="card booking-form sold-out">
        <h2>🎟️ Tickets Sold Out</h2>
        <p>Sorry, there are no more tickets available for this event.</p>
      </div>
    );
  }

  return (
    <div className="card booking-form">
      <h2>🎟️ Book Your Tickets</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="userName"
            placeholder="John Doe"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Department</label>
          <select name="department" value={formData.department} onChange={handleChange} required>
            <option value="" disabled>Select your department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Number of Tickets</label>
          <input
            type="number"
            name="ticketsBooked"
            min="1"
            max={availableTickets}
            value={formData.ticketsBooked}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={handleReset} disabled={isSubmitting}>
            Reset
          </button>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Booking..." : "Book Ticket"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TicketBookingForm;
