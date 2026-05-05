import React, { useState } from 'react';
import './App.css';
import EventDetails from './components/EventDetails';
import BookingForm from './components/BookingForm';
import BookingSummary from './components/BookingSummary';
import emailService from './services/emailService';

export default function App() {
  // Booking states
  const [event, setEvent] = useState({
    id: 'event_001',
    name: "LAVAZA 2026",
    department: "CSE",
    date: "June 12, 2026",
    time: "09:00 AM",
    venue: "MG Stadium",
    price: 499,
    availableTickets: 40
  });

  const [currentStep, setCurrentStep] = useState('booking'); // booking, summary
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle booking form submission
  const handleBookingSubmit = async (data) => {
    setLoading(true);
    setError('');
    
    try {
      setBookingData(data);
      // Update available tickets
      setEvent(prev => ({
        ...prev,
        availableTickets: prev.availableTickets - data.numTickets
      }));
      // Go directly to summary
      setCurrentStep('summary');
    } catch (err) {
      console.error('Error in booking:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle reset (start new booking)
  const handleReset = () => {
    setCurrentStep('booking');
    setBookingData(null);
    setError('');
  };

  return (
    <div className="app-wrapper">
      <header className="main-header">
        <h1>VELTECH<span> EVENTS</span></h1>
        <p>Seamless internal event management</p>
      </header>

      <main className="container">
        {/* Error banner */}
        {error && (
          <div className="error-banner">
            <button 
              className="close-banner" 
              onClick={() => setError('')}
            >
              ×
            </button>
            {error}
          </div>
        )}

        {/* Step indicator */}
        {currentStep !== 'booking' && (
          <div className="step-indicator">
            <div className={`step ${currentStep !== 'booking' ? 'completed' : ''}`}>
              <span>1</span>
              <p>Booking</p>
            </div>
            <div className="connector"></div>
            <div className={`step ${currentStep === 'summary' ? 'active' : ''}`}>
              <span>2</span>
              <p>Confirm</p>
            </div>
          </div>
        )}

        {/* Event details */}
        <EventDetails event={event} />

        {/* Current step component */}
        {currentStep === 'booking' && (
          <BookingForm 
            event={event} 
            onBookingSubmit={handleBookingSubmit}
          />
        )}

        {currentStep === 'summary' && bookingData && (
          <BookingSummary
            summary={bookingData}
            event={event}
            onReset={handleReset}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>&copy; 2026 VELTECH Events. All rights reserved.</p>
        <p>Contact: events@veltech.edu.in | Phone: +91-XXXXXXXXXX</p>
      </footer>
    </div>
  );
}