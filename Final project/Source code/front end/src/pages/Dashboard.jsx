import React, { useState, useEffect } from "react";
import { getEvents } from "../services/api";
import EventModal from "../components/EventModal";
import "./PageStyles.css";

const CATEGORY_COLORS = {
  Technology: "#7928ca",
  Hackathon: "#ff0080",
  Cultural: "#ffa500",
  Workshop: "#00b8ff",
  Sports: "#00ff88",
  General: "#888",
};

const Dashboard = ({ user, onLogout, onSelectEvent }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeModal, setActiveModal] = useState(null); // event object
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await getEvents();
      if (data.success) setEvents(data.data);
      else setError("Failed to load events.");
    } catch {
      setError("Could not connect to server. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const categories = ["All", ...Array.from(new Set(events.map((e) => e.category)))];
  const filtered = filterCategory === "All" ? events : events.filter((e) => e.category === filterCategory);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  const formatTime = (d) =>
    new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  const getSlotsLabel = (available, total) => {
    const pct = (available / total) * 100;
    if (available === 0) return { text: "Sold Out", color: "#ff3366" };
    if (pct <= 20) return { text: "Almost Full", color: "#ffa500" };
    return { text: `${available} Slots Left`, color: "#00ff88" };
  };

  return (
    <div className="dashboard-page">
      {/* Background */}
      <div className="dash-bg">
        <div className="blob b1" />
        <div className="blob b2" />
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-brand">
          <span>🎟️</span>
          <span>Campus<span className="grad-text">Tix</span></span>
        </div>
        <div className="nav-right">
          <div className="user-pill">
            <span className="user-avatar">{user?.name?.charAt(0).toUpperCase()}</span>
            <span className="user-name">{user?.name}</span>
          </div>
          <button id="logout-btn" className="btn-ghost" onClick={onLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-content">
          <div className="hero-badge">🏛️ Organized by CSE Department</div>
          <h1 className="hero-title">Upcoming <span className="grad-text">Events</span></h1>
          <p className="hero-sub">Discover, register, and attend exciting events organized by your CSE department</p>
        </div>
        <div className="hero-stats">
          <div className="stat-pill">
            <span className="stat-num">{events.length}</span>
            <span className="stat-label">Events</span>
          </div>
          <div className="stat-pill">
            <span className="stat-num">{events.reduce((a, e) => a + e.availableTickets, 0)}</span>
            <span className="stat-label">Slots Available</span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="filter-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            id={`filter-${cat.toLowerCase()}`}
            className={`filter-chip ${filterCategory === cat ? "active" : ""}`}
            onClick={() => setFilterCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main content */}
      <main className="events-main">
        {loading ? (
          <div className="loading-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="event-card skeleton-card" />
            ))}
          </div>
        ) : error ? (
          <div className="error-box">
            <span>⚠️</span>
            <p>{error}</p>
            <button className="btn-outline" onClick={fetchEvents}>Retry</button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <span>📅</span>
            <p>No events in this category.</p>
          </div>
        ) : (
          <div className="events-grid">
            {filtered.map((event) => {
              const slotInfo = getSlotsLabel(event.availableTickets, event.totalTickets);
              const catColor = CATEGORY_COLORS[event.category] || "#888";
              const pct = Math.round(((event.totalTickets - event.availableTickets) / event.totalTickets) * 100);
              return (
                <div
                  key={event.id}
                  id={`event-card-${event.id}`}
                  className="event-card"
                  onClick={() => setActiveModal(event)}
                  style={{ "--cat-color": catColor }}
                >
                  <div className="card-top">
                    <div className="event-emoji">{event.imageEmoji}</div>
                    <div className="card-badges">
                      <span className="cat-badge" style={{ background: catColor + "22", color: catColor, border: `1px solid ${catColor}44` }}>
                        {event.category}
                      </span>
                      <span className="slot-badge" style={{ color: slotInfo.color }}>
                        ● {slotInfo.text}
                      </span>
                    </div>
                  </div>

                  <h3 className="event-name">{event.name}</h3>
                  <p className="event-dept">🏛️ {event.department}</p>
                  <p className="event-desc">{event.description.slice(0, 100)}...</p>

                  <div className="event-meta">
                    <span>📅 {formatDate(event.startDate)}</span>
                    <span>⏰ {formatTime(event.startDate)}</span>
                    <span>📍 {event.venue.split(",")[0]}</span>
                  </div>

                  {/* Slots progress bar */}
                  <div className="slots-bar">
                    <div className="slots-progress" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${catColor}, ${catColor}88)` }} />
                  </div>

                  <div className="card-footer">
                    <span className="ticket-price">₹{event.ticketPrice}</span>
                    <button
                      id={`view-event-${event.id}`}
                      className="btn-view"
                      onClick={(e) => { e.stopPropagation(); setActiveModal(event); }}
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="dash-footer">
        <p>© 2026 CampusTix Platform · Powered by CSE Department</p>
      </footer>

      {/* Event Modal */}
      {activeModal && (
        <EventModal
          event={activeModal}
          onClose={() => setActiveModal(null)}
          onBook={() => { setActiveModal(null); onSelectEvent(activeModal); }}
        />
      )}
    </div>
  );
};

export default Dashboard;
