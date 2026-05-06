import React, { useState } from "react";
import { createBooking } from "../services/api";
import "./PageStyles.css";

const DEPARTMENTS = [
  "Computer Science and Engineering",
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Management Studies",
  "Other",
];

const BookingPage = ({ user, event, onBack, onProceedToPayment }) => {
  const [form, setForm] = useState({
    userName: user?.name || "",
    email: user?.email || "",
    department: "",
    phone: "",
    ticketsBooked: 1,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError("");
  };

  const totalCost = (parseFloat(form.ticketsBooked) || 0) * event.ticketPrice;

  const validate = () => {
    if (!form.userName || !form.email || !form.department || !form.phone) return "All fields are required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Enter a valid email address.";
    if (!/^[6-9]\d{9}$/.test(form.phone)) return "Enter a valid 10-digit mobile number.";
    if (form.ticketsBooked < 1) return "Minimum 1 ticket.";
    if (form.ticketsBooked > event.availableTickets) return `Only ${event.availableTickets} tickets left.`;
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }

    setLoading(true);
    try {
      const res = await createBooking({
        ...form,
        ticketsBooked: parseInt(form.ticketsBooked),
        eventId: event.id,
        userId: user?.id || null,
      });
      if (res.success) {
        onProceedToPayment(form, res.data);
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-page">
      <div className="dash-bg">
        <div className="blob b1" />
        <div className="blob b2" />
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <button id="back-to-dashboard" className="btn-ghost" onClick={onBack}>← Back</button>
        <div className="nav-brand">
          <span>🎟️</span>
          <span>Campus<span className="grad-text">Tix</span></span>
        </div>
        <div className="user-pill">
          <span className="user-avatar">{user?.name?.charAt(0).toUpperCase()}</span>
          <span className="user-name">{user?.name}</span>
        </div>
      </nav>

      <main className="booking-main">
        {/* Event Summary Strip */}
        <div className="booking-event-strip">
          <span className="strip-emoji">{event.imageEmoji}</span>
          <div className="strip-info">
            <h2>{event.name}</h2>
            <p>📅 {new Date(event.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} &nbsp;|&nbsp; 📍 {event.venue}</p>
          </div>
          <div className="strip-price">
            <span>₹{event.ticketPrice}</span>
            <small>per ticket</small>
          </div>
        </div>

        <div className="booking-grid">
          {/* Form */}
          <div className="booking-form-card">
            <h3 className="section-title">
              <span className="step-badge">1</span> Attendee Details
            </h3>

            {error && <div className="alert alert-error">⚠️ {error}</div>}

            <form id="booking-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="field">
                  <label>Full Name *</label>
                  <input
                    id="booking-name"
                    type="text"
                    name="userName"
                    placeholder="John Doe"
                    value={form.userName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="field">
                  <label>Email Address *</label>
                  <input
                    id="booking-email"
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label>Department *</label>
                  <select id="booking-dept" name="department" value={form.department} onChange={handleChange} required>
                    <option value="" disabled>Select department</option>
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label>Phone Number *</label>
                  <input
                    id="booking-phone"
                    type="tel"
                    name="phone"
                    placeholder="10-digit mobile number"
                    value={form.phone}
                    onChange={handleChange}
                    maxLength={10}
                    required
                  />
                </div>
              </div>

              <div className="field tickets-field">
                <label>Number of Tickets *</label>
                <div className="ticket-counter">
                  <button
                    type="button"
                    id="tickets-minus"
                    className="counter-btn"
                    onClick={() => setForm((p) => ({ ...p, ticketsBooked: Math.max(1, p.ticketsBooked - 1) }))}
                  >−</button>
                  <input
                    id="booking-tickets"
                    type="number"
                    name="ticketsBooked"
                    min="1"
                    max={event.availableTickets}
                    value={form.ticketsBooked}
                    onChange={handleChange}
                    className="tickets-input"
                    required
                  />
                  <button
                    type="button"
                    id="tickets-plus"
                    className="counter-btn"
                    onClick={() => setForm((p) => ({ ...p, ticketsBooked: Math.min(event.availableTickets, parseInt(p.ticketsBooked) + 1) }))}
                  >+</button>
                </div>
                <small className="field-hint">{event.availableTickets} slots available</small>
              </div>

              <button
                id="proceed-to-payment"
                type="submit"
                className="btn-proceed"
                disabled={loading}
              >
                {loading ? <span className="spinner" /> : "Proceed to Payment →"}
              </button>
            </form>
          </div>

          {/* Order Summary sidebar */}
          <div className="order-summary-card">
            <h3 className="section-title">
              <span className="step-badge">2</span> Order Summary
            </h3>
            <div className="order-rows">
              <div className="order-row">
                <span>Event</span>
                <strong>{event.name}</strong>
              </div>
              <div className="order-row">
                <span>Category</span>
                <strong>{event.category}</strong>
              </div>
              <div className="order-row">
                <span>Tickets</span>
                <strong>{form.ticketsBooked}</strong>
              </div>
              <div className="order-row">
                <span>Price per ticket</span>
                <strong>₹{event.ticketPrice}</strong>
              </div>
              <div className="order-divider" />
              <div className="order-row total-row">
                <span>Total Amount</span>
                <strong className="total-amount">₹{totalCost.toFixed(2)}</strong>
              </div>
            </div>

            <div className="payment-methods">
              <p className="pm-label">Accepted Payments</p>
              <div className="pm-icons">
                <span>💳</span><span>📱</span><span>🏦</span>
              </div>
              <small>UPI · Card · Net Banking</small>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingPage;
