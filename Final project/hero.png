import React, { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import BookingPage from "./pages/BookingPage";
import PaymentPage from "./pages/PaymentPage";
import SuccessPage from "./pages/SuccessPage";
import "./index.css";

// Simple client-side router using state
// Pages: "login" | "register" | "dashboard" | "booking" | "payment" | "success"

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null); // { id, name, email }
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bookingData, setBookingData] = useState(null); // form data before payment
  const [bookingResult, setBookingResult] = useState(null); // result after booking created

  // Load user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("campustix_user");
    if (stored) {
      setUser(JSON.parse(stored));
      setPage("dashboard");
    }
  }, []);

  const navigate = (target) => setPage(target);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("campustix_user", JSON.stringify(userData));
    setPage("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("campustix_user");
    setPage("login");
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setPage("booking");
  };

  const handleBookingSubmit = (formData, result) => {
    setBookingData(formData);
    setBookingResult(result);
    setPage("payment");
  };

  const handlePaymentSuccess = (updatedResult) => {
    setBookingResult(updatedResult);
    setPage("success");
  };

  const handleReset = () => {
    setSelectedEvent(null);
    setBookingData(null);
    setBookingResult(null);
    setPage("dashboard");
  };

  // Route guard: if not logged in and trying to access protected pages, send to login
  useEffect(() => {
    if (!user && !["login", "register"].includes(page)) {
      setPage("login");
    }
  }, [page, user]);

  switch (page) {
    case "login":
      return <LoginPage onLogin={handleLogin} onGoRegister={() => navigate("register")} />;
    case "register":
      return <RegisterPage onRegistered={() => navigate("login")} onGoLogin={() => navigate("login")} />;
    case "dashboard":
      return <Dashboard user={user} onLogout={handleLogout} onSelectEvent={handleSelectEvent} />;
    case "booking":
      return (
        <BookingPage
          user={user}
          event={selectedEvent}
          onBack={() => navigate("dashboard")}
          onProceedToPayment={handleBookingSubmit}
        />
      );
    case "payment":
      return (
        <PaymentPage
          bookingResult={bookingResult}
          onPaySuccess={handlePaymentSuccess}
          onBack={() => navigate("booking")}
        />
      );
    case "success":
      return <SuccessPage bookingResult={bookingResult} onDone={handleReset} />;
    default:
      return <LoginPage onLogin={handleLogin} onGoRegister={() => navigate("register")} />;
  }
}

export default App;
