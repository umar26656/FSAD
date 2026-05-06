import React from "react";
import "./ComponentStyles.css";

const EventModal = ({ event, onClose, onBook }) => {
  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const formatTime = (d) =>
    new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });

  const getDuration = () => {
    const ms = new Date(event.endDate) - new Date(event.startDate);
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    if (h === 0) return `${m} min`;
    if (m === 0) return `${h} hr`;
    return `${h} hr ${m} min`;
  };

  const slotPct = Math.round(((event.totalTickets - event.availableTickets) / event.totalTickets) * 100);
  const isSoldOut = event.availableTickets === 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button id="modal-close" className="modal-close" onClick={onClose}>✕</button>

        {/* Header */}
        <div className="modal-header">
          <div className="modal-emoji">{event.imageEmoji}</div>
          <div>
            <h2 className="modal-event-name">{event.name}</h2>
            <p className="modal-dept">🏛️ Organized by {event.department}</p>
          </div>
        </div>

        {/* Description */}
        <p className="modal-desc">{event.description}</p>

        {/* Info Grid */}
        <div className="modal-info-grid">
          <div className="modal-info-item">
            <span className="mi-icon">📅</span>
            <div>
              <strong>Start</strong>
              <p>{formatDate(event.startDate)}</p>
              <p className="mi-time">{formatTime(event.startDate)}</p>
            </div>
          </div>
          <div className="modal-info-item">
            <span className="mi-icon">🏁</span>
            <div>
              <strong>End</strong>
              <p>{formatDate(event.endDate)}</p>
              <p className="mi-time">{formatTime(event.endDate)}</p>
            </div>
          </div>
          <div className="modal-info-item">
            <span className="mi-icon">⏱️</span>
            <div>
              <strong>Duration</strong>
              <p>{getDuration()}</p>
            </div>
          </div>
          <div className="modal-info-item">
            <span className="mi-icon">📍</span>
            <div>
              <strong>Venue</strong>
              <p>{event.venue}</p>
            </div>
          </div>
          <div className="modal-info-item">
            <span className="mi-icon">💰</span>
            <div>
              <strong>Ticket Price</strong>
              <p className="price-text">₹{event.ticketPrice}</p>
            </div>
          </div>
          <div className="modal-info-item">
            <span className="mi-icon">🎟️</span>
            <div>
              <strong>Remaining Slots</strong>
              <p className={`slot-text ${isSoldOut ? "sold-out" : event.availableTickets < event.totalTickets * 0.2 ? "low" : "available"}`}>
                {event.availableTickets} / {event.totalTickets}
              </p>
            </div>
          </div>
        </div>

        {/* Slots Bar */}
        <div className="modal-slots-section">
          <div className="modal-slots-label">
            <span>Booking Progress</span>
            <span>{slotPct}% filled</span>
          </div>
          <div className="modal-slots-bar">
            <div
              className="modal-slots-fill"
              style={{
                width: `${slotPct}%`,
                background: isSoldOut
                  ? "#ff3366"
                  : slotPct > 80
                  ? "linear-gradient(90deg, #ffa500, #ff3366)"
                  : "linear-gradient(90deg, #7928ca, #00b8ff)",
              }}
            />
          </div>
        </div>

        {/* Action */}
        <div className="modal-actions">
          <button id="modal-cancel" className="btn-ghost-lg" onClick={onClose}>Cancel</button>
          <button
            id={`book-event-${event.id}`}
            className="btn-book"
            onClick={onBook}
            disabled={isSoldOut}
          >
            {isSoldOut ? "Sold Out" : "📩 Book Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
