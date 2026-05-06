import React from "react";
import "./PageStyles.css";

const SuccessPage = ({ bookingResult, onDone }) => {
  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const formatTime = (d) =>
    new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });

  return (
    <div className="success-page">
      <div className="dash-bg">
        <div className="blob b1" />
        <div className="blob b2" />
      </div>

      <nav className="navbar">
        <div className="nav-brand">
          <span>🎟️</span>
          <span>Campus<span className="grad-text">Tix</span></span>
        </div>
      </nav>

      <main className="success-main">
        <div className="success-card">
          {/* Confetti-like top decoration */}
          <div className="success-confetti">
            {["🎉","🎊","✨","🌟","🎈","🎉","✨"].map((e, i) => (
              <span key={i} style={{ animationDelay: `${i * 0.1}s` }}>{e}</span>
            ))}
          </div>

          <div className="success-icon-circle">✅</div>
          <h1 className="success-headline">Booking Confirmed!</h1>
          <p className="success-sub">Your ticket has been booked and payment is successful.</p>

          {/* Ticket */}
          <div className="ticket-card">
            <div className="ticket-header">
              <span className="ticket-event-emoji">🎟️</span>
              <div>
                <h3>{bookingResult?.eventName}</h3>
                <p>📍 {bookingResult?.venue}</p>
              </div>
            </div>

            <div className="ticket-divider">
              <div className="ticket-hole left" />
              <div className="ticket-dash" />
              <div className="ticket-hole right" />
            </div>

            <div className="ticket-details">
              <div className="td-row">
                <span>Booking ID</span>
                <strong>#TIX{String(bookingResult?.bookingId).padStart(5, "0")}</strong>
              </div>
              <div className="td-row">
                <span>Name</span>
                <strong>{bookingResult?.userName}</strong>
              </div>
              <div className="td-row">
                <span>Email</span>
                <strong>{bookingResult?.email}</strong>
              </div>
              <div className="td-row">
                <span>Date</span>
                <strong>{bookingResult?.startDate ? formatDate(bookingResult.startDate) : "—"}</strong>
              </div>
              <div className="td-row">
                <span>Time</span>
                <strong>{bookingResult?.startDate ? formatTime(bookingResult.startDate) : "—"}</strong>
              </div>
              <div className="td-row">
                <span>Tickets</span>
                <strong>{bookingResult?.ticketsBooked}</strong>
              </div>
              <div className="td-row highlight-row-ticket">
                <span>Total Paid</span>
                <strong className="paid-amount">₹{bookingResult?.totalAmount?.toFixed(2)}</strong>
              </div>
              <div className="td-row">
                <span>Status</span>
                <strong className="status-paid">✅ PAID</strong>
              </div>
            </div>
          </div>

          <button id="back-to-events" className="btn-proceed" onClick={onDone}>
            🏠 Back to Events
          </button>

          <p className="success-note">A confirmation will be sent to {bookingResult?.email}</p>
        </div>
      </main>
    </div>
  );
};

export default SuccessPage;
