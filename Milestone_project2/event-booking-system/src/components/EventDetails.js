import React from 'react';

const EventDetails = ({ event }) => (
  <div className="card">
    <h2>{event.name}</h2>
    <p><strong>Dept:</strong> {event.department}</p>
    <p><strong>When:</strong> {event.date} at {event.time}</p>
    <p><strong>Where:</strong> {event.venue}</p>
    <p><strong>Price:</strong> ₹{event.price}</p>
    <h3 style={{color: event.availableTickets > 0 ? 'green' : 'red'}}>
      Available Tickets: {event.availableTickets}
    </h3>
  </div>
);

export default EventDetails;