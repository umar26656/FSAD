import React from "react";
import "./ComponentStyles.css";

const EventDetails = ({ event }) => {
  if (!event) return <div className="card event-details skeleton">Loading Event...</div>;

  return (
    <div className="card event-details">
      <div className="card-header">
        <h2>ILIZIAM</h2>
        <span className="badge">Organized by CSE Department</span>
      </div>
      <div className="card-body">
        <div className="info-row">
          <span className="icon">📅</span>
          <div>
            <strong>Date & Time</strong>
            <p>{new Date(event.date).toLocaleString()}</p>
          </div>
        </div>
        <div className="info-row">
          <span className="icon">📍</span>
          <div>
            <strong>Venue</strong>
            <p>{event.venue}</p>
          </div>
        </div>
        <div className="info-row">
          <span className="icon">💵</span>
          <div>
            <strong>Ticket Price</strong>
            <p>₹{event.ticketPrice}</p>
          </div>
        </div>
        <div className="info-row highlight">
          <span className="icon">🎟️</span>
          <div>
            <strong>Available Tickets</strong>
            <p className="highlight-text">{event.availableTickets}</p>
          </div>
        </div>
        <div className="info-row">
          <span className="icon">💻</span>
          <div>
            <strong>Event List</strong>
            <p>Coding, Web Development, Connections</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
