import React from "react";
import "./ComponentStyles.css";

const BookingSummary = ({ summary, onReset }) => {
  return (
    <div className="card booking-summary">
      <div className="success-icon">✅</div>
      <h2>Booking Confirmed!</h2>
      <p className="subtitle">Your tickets have been successfully booked.</p>

      <div className="summary-details">
        <div className="summary-row">
          <span>Name:</span>
          <strong>{summary.userName}</strong>
        </div>
        <div className="summary-row">
          <span>Email:</span>
          <strong>{summary.email}</strong>
        </div>
        <div className="summary-row">
          <span>Event:</span>
          <strong>{summary.eventName}</strong>
        </div>
        <div className="summary-row">
          <span>Tickets:</span>
          <strong>{summary.ticketsBooked}</strong>
        </div>
        <div className="summary-row highlight-row">
          <span>Total Amount:</span>
          <strong>₹{summary.totalAmount}</strong>
        </div>
      </div>

      <button className="btn btn-primary mt-4" onClick={onReset}>
        Book More Tickets
      </button>
    </div>
  );
};

export default BookingSummary;
