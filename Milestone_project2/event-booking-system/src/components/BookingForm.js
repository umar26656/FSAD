import React, { useState } from 'react';
import { isValidEmail, isValidPhoneNumber, generateBookingId } from '../utils/validators';

const BookingForm = ({ event, onBookingSubmit }) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phoneNumber: '',
    dept: '', 
    numTickets: 1 
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || formData.name.trim() === '') {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email || !isValidEmail(formData.email)) {
      newErrors.email = 'Valid email is required';
    }

    if (!formData.phoneNumber || !isValidPhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Valid 10-digit phone number is required';
    }

    if (!formData.dept || formData.dept.trim() === '') {
      newErrors.dept = 'Department is required';
    }

    if (formData.numTickets <= 0) {
      newErrors.numTickets = 'Number of tickets must be at least 1';
    }

    if (formData.numTickets > event.availableTickets) {
      newErrors.numTickets = 'Not enough tickets available';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const bookingId = generateBookingId();
      const bookingData = {
        ...formData,
        bookingId,
        total: formData.numTickets * event.price,
        eventId: event.id || 'event_001',
        eventName: event.name,
      };

      onBookingSubmit(bookingData);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="card form-card">
      <h3>Reserve Your Spot</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Full Name *</label>
          <input 
            type="text" 
            placeholder="John Doe" 
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            disabled={loading}
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>

        <div className="input-group">
          <label>Email Address *</label>
          <input 
            type="email" 
            placeholder="john@company.com" 
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            disabled={loading}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className="input-group">
          <label>Phone Number *</label>
          <input 
            type="tel" 
            placeholder="9876543210" 
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange('phoneNumber', e.target.value.replace(/\D/g, '').slice(0, 10))}
            maxLength="10"
            disabled={loading}
          />
          {errors.phoneNumber && <span className="field-error">{errors.phoneNumber}</span>}
        </div>

        <div className="input-group">
          <label>Department *</label>
          <input 
            type="text" 
            placeholder="Engineering" 
            value={formData.dept}
            onChange={(e) => handleInputChange('dept', e.target.value)}
            disabled={loading}
          />
          {errors.dept && <span className="field-error">{errors.dept}</span>}
        </div>

        <div className="input-group">
          <label>Number of Tickets *</label>
          <input 
            type="number" 
            min="1" 
            max={event.availableTickets}
            value={formData.numTickets} 
            onChange={(e) => handleInputChange('numTickets', parseInt(e.target.value) || 0)}
            disabled={loading}
          />
          <small>{event.availableTickets} tickets available</small>
          {errors.numTickets && <span className="field-error">{errors.numTickets}</span>}
        </div>

        {errors.submit && <p className="error-msg">{errors.submit}</p>}
        
        <button 
          type="submit" 
          className="btn-primary"
          disabled={event.availableTickets === 0 || loading}
        >
          {loading ? 'Processing...' : event.availableTickets > 0 ? 'Proceed to Payment' : 'Sold Out'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;