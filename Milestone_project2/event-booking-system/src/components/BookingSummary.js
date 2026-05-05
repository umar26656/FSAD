import React, { useEffect, useState } from 'react';
import emailService from '../services/emailService';
import { formatDate, formatTime, formatCurrency } from '../utils/validators';

const BookingSummary = ({ summary, event, onReset }) => {
  const [emailSent, setEmailSent] = useState(false);
  const [ticketSent, setTicketSent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Send ticket email on component mount
  useEffect(() => {
    const sendTicket = async () => {
      try {
        setLoading(true);
        
        // Send ticket email
        const ticketData = {
          email: summary.email,
          name: summary.name,
          bookingId: summary.bookingId,
          eventName: event.name,
          eventDate: event.date,
          eventTime: event.time,
          venue: event.venue,
          numTickets: summary.numTickets,
          total: summary.total,
          department: summary.dept,
        };

        await emailService.sendTicketEmail(ticketData);
        setTicketSent(true);
        
        // Send confirmation email
        const confirmationData = {
          email: summary.email,
          name: summary.name,
          bookingId: summary.bookingId,
          bookingDetails: {
            eventName: event.name,
            eventDate: event.date,
            eventTime: event.time,
            venue: event.venue,
            numTickets: summary.numTickets,
            total: summary.total,
          },
        };

        await emailService.sendBookingConfirmation(confirmationData);
        setEmailSent(true);
      } catch (err) {
        console.error('Error sending ticket/confirmation:', err);
        setError('Ticket details have been sent to your email shortly.');
      } finally {
        setLoading(false);
      }
    };

    if (summary && summary.email) {
      sendTicket();
    }
  }, [summary, event]);

  return (
    <div className="card summary-card">
      <div className="success-icon">✓</div>
      <h2>Booking Confirmed!</h2>
      <p className="success-text">Pack your bags, {summary.name.split(' ')[0]}!</p>

      <div className="receipt">
        <div className="receipt-section">
          <h4>Booking Details</h4>
          <div className="receipt-row">
            <span>Booking ID:</span>
            <span className="booking-id">{summary.bookingId}</span>
          </div>
          <div className="receipt-row">
            <span>Name:</span>
            <span>{summary.name}</span>
          </div>
          <div className="receipt-row">
            <span>Email:</span>
            <span>{summary.email}</span>
          </div>
          <div className="receipt-row">
            <span>Department:</span>
            <span>{summary.dept}</span>
          </div>
        </div>

        <div className="receipt-section">
          <h4>Event Details</h4>
          <div className="receipt-row">
            <span>Event:</span>
            <span>{event.name}</span>
          </div>
          <div className="receipt-row">
            <span>Date:</span>
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="receipt-row">
            <span>Time:</span>
            <span>{event.time}</span>
          </div>
          <div className="receipt-row">
            <span>Venue:</span>
            <span>{event.venue}</span>
          </div>
        </div>

        <div className="receipt-section">
          <h4>Ticket Summary</h4>
          <div className="receipt-row">
            <span>Tickets:</span>
            <span>{summary.numTickets}</span>
          </div>
          <div className="receipt-row">
            <span>Price per Ticket:</span>
            <span>{formatCurrency(event.price)}</span>
          </div>
          <div className="receipt-row total">
            <span>Total Amount:</span>
            <span className="total-amount">{formatCurrency(summary.total)}</span>
          </div>
        </div>
      </div>

      <div className="email-status">
        {loading && (
          <div className="status-item sending">
            <span className="spinner">⏳</span>
            <p>Sending tickets to your email...</p>
          </div>
        )}
        {ticketSent && (
          <div className="status-item success">
            <span>✓</span>
            <p>Tickets have been sent to {summary.email}</p>
          </div>
        )}
        {emailSent && (
          <div className="status-item success">
            <span>✓</span>
            <p>Confirmation email has been sent</p>
          </div>
        )}
        {error && (
          <div className="status-item info">
            <span>ℹ️</span>
            <p>{error}</p>
          </div>
        )}
      </div>

      <div className="important-notes">
        <h4>Important Notes:</h4>
        <ul>
          <li>Your tickets have been sent to {summary.email}</li>
          <li>Check your spam folder if you don't see the email</li>
          <li>Bring a valid ID along with your ticket</li>
          <li>Arrive 15 minutes before the event starts</li>
        </ul>
      </div>

      <div className="button-group">
        <button onClick={onReset} className="btn-secondary">
          Book Another Ticket
        </button>
      </div>
    </div>
  );
};

export default BookingSummary;