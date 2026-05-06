import React, { useState, useEffect } from "react";
import { completePayment, getQRCode } from "../services/api";
import "./PageStyles.css";

const PaymentPage = ({ bookingResult, onPaySuccess, onBack }) => {
  const [method, setMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [qrLoading, setQrLoading] = useState(true);
  const [showQrConfirm, setShowQrConfirm] = useState(false);

  // Load QR code on mount
  useEffect(() => {
    const loadQR = async () => {
      try {
        const res = await getQRCode();
        if (res.success) {
          setQrCode(res.data);
          setUpiId(res.data.upiId);
        }
      } catch (err) {
        console.error("Failed to load QR code:", err);
      } finally {
        setQrLoading(false);
      }
    };
    loadQR();
  }, []);

  const validate = () => {
    if (method === "upi" && !showQrConfirm) {
      if (!upiId || !/^[\w.\-]+@[\w]+$/.test(upiId)) return "Enter a valid UPI ID (e.g. name@upi).";
    } else if (method === "card") {
      if (cardNo.replace(/\s/g, "").length !== 16) return "Enter a valid 16-digit card number.";
      if (!cardName.trim()) return "Enter the cardholder name.";
      if (!/^\d{2}\/\d{2}$/.test(expiry)) return "Enter expiry in MM/YY format.";
      if (cvv.length !== 3) return "Enter a valid 3-digit CVV.";
    }
    return null;
  };

  const formatCardNo = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const handlePay = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setLoading(true);
    try {
      const res = await completePayment(bookingResult.bookingId);
      if (res.success) {
        onPaySuccess({ ...bookingResult, paymentStatus: "paid", paymentMethod: method });
      } else {
        setError(res.message);
      }
    } catch (e) {
      setError(e.response?.data?.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-page">
      <div className="dash-bg">
        <div className="blob b1" />
        <div className="blob b2" />
      </div>

      <nav className="navbar">
        <button id="back-to-booking" className="btn-ghost" onClick={onBack}>← Back</button>
        <div className="nav-brand">
          <span>🎟️</span>
          <span>Campus<span className="grad-text">Tix</span></span>
        </div>
        <div className="secure-badge">🔒 Secure Checkout</div>
      </nav>

      <main className="payment-main">
        <div className="payment-grid">
          {/* Payment form */}
          <div className="payment-form-card">
            <h2 className="payment-title">Complete Payment</h2>
            <p className="payment-sub">Choose your preferred payment method</p>

            {/* Method Tabs */}
            <div className="method-tabs">
              {[
                { id: "upi", icon: "📱", label: "UPI" },
                { id: "card", icon: "💳", label: "Card" },
                { id: "netbanking", icon: "🏦", label: "Net Banking" },
              ].map((m) => (
                <button
                  key={m.id}
                  id={`pay-method-${m.id}`}
                  className={`method-tab ${method === m.id ? "active" : ""}`}
                  onClick={() => { setMethod(m.id); setError(""); setShowQrConfirm(false); }}
                  type="button"
                >
                  <span>{m.icon}</span>
                  <span>{m.label}</span>
                </button>
              ))}
            </div>

            {error && <div className="alert alert-error">⚠️ {error}</div>}

            <form id="payment-form" onSubmit={handlePay}>
              {method === "upi" && (
                <div className="pay-method-panel">
                  {qrLoading ? (
                    <div className="qr-placeholder">
                      <span>⏳ Loading QR Code...</span>
                    </div>
                  ) : qrCode ? (
                    <div className="upi-qr-section">
                      <div className="qr-code-container">
                        <img src={qrCode.qrCode} alt="Payment QR Code" className="qr-code-image" />
                        <p className="qr-instruction">📱 Scan with any UPI app</p>
                      </div>
                      
                      {!showQrConfirm ? (
                        <>
                          <p className="qr-divider">OR</p>
                          <div className="field">
                            <label>Enter UPI ID</label>
                            <input
                              id="upi-id"
                              type="text"
                              placeholder="yourname@upi"
                              value={upiId}
                              onChange={(e) => { setUpiId(e.target.value); setError(""); }}
                            />
                          </div>
                        </>
                      ) : null}

                      <div className="qr-confirm-section">
                        {showQrConfirm ? (
                          <div className="qr-paid-status">
                            <p style={{ fontSize: "14px", marginBottom: "10px" }}>
                              ✅ Have you completed the payment via UPI/QR?
                            </p>
                            <button
                              type="button"
                              className="btn-confirm-payment"
                              onClick={() => { setShowQrConfirm(false); setError(""); }}
                              style={{ marginBottom: "8px" }}
                            >
                              ← Go Back
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="btn-qr-confirm"
                            onClick={() => setShowQrConfirm(true)}
                          >
                            ✅ I have paid via UPI
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="upi-illustration">
                      <span className="upi-logo">UPI</span>
                      <div className="qr-placeholder">
                        <span>❌ QR Code not available</span>
                      </div>
                      <div className="field">
                        <label>Enter UPI ID</label>
                        <input
                          id="upi-id"
                          type="text"
                          placeholder="yourname@upi"
                          value={upiId}
                          onChange={(e) => { setUpiId(e.target.value); setError(""); }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {method === "card" && (
                <div className="pay-method-panel">
                  <div className="card-preview">
                    <div className="card-chip">■■■</div>
                    <div className="card-number-display">{cardNo || "•••• •••• •••• ••••"}</div>
                    <div className="card-bottom">
                      <div>
                        <small>Card Holder</small>
                        <p>{cardName || "YOUR NAME"}</p>
                      </div>
                      <div>
                        <small>Expires</small>
                        <p>{expiry || "MM/YY"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <label>Card Number</label>
                    <input
                      id="card-number"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardNo}
                      onChange={(e) => { setCardNo(formatCardNo(e.target.value)); setError(""); }}
                      maxLength={19}
                    />
                  </div>
                  <div className="field">
                    <label>Cardholder Name</label>
                    <input
                      id="card-name"
                      type="text"
                      placeholder="Name on card"
                      value={cardName}
                      onChange={(e) => { setCardName(e.target.value.toUpperCase()); setError(""); }}
                    />
                  </div>
                  <div className="form-row">
                    <div className="field">
                      <label>Expiry (MM/YY)</label>
                      <input
                        id="card-expiry"
                        type="text"
                        placeholder="MM/YY"
                        value={expiry}
                        maxLength={5}
                        onChange={(e) => {
                          let v = e.target.value.replace(/\D/g, "");
                          if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2, 4);
                          setExpiry(v);
                          setError("");
                        }}
                      />
                    </div>
                    <div className="field">
                      <label>CVV</label>
                      <input
                        id="card-cvv"
                        type="password"
                        placeholder="•••"
                        value={cvv}
                        maxLength={3}
                        onChange={(e) => { setCvv(e.target.value.replace(/\D/g, "")); setError(""); }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {method === "netbanking" && (
                <div className="pay-method-panel">
                  <p className="nb-info">You will be redirected to your bank's secure portal.</p>
                  <div className="bank-grid">
                    {["SBI", "HDFC", "ICICI", "Axis", "Kotak", "Other"].map((b) => (
                      <div key={b} className="bank-tile">{b}</div>
                    ))}
                  </div>
                </div>
              )}

              <button
                id="pay-now-btn"
                type="submit"
                className="btn-pay"
                disabled={loading}
              >
                {loading ? <span className="spinner" /> : `Pay ₹${bookingResult?.totalAmount?.toFixed(2)}`}
              </button>
            </form>
          </div>

          {/* Order review */}
          <div className="payment-summary-card">
            <h3 className="section-title">Order Review</h3>
            <div className="review-event">
              <span className="review-emoji">🎟️</span>
              <div>
                <p className="review-name">{bookingResult?.eventName}</p>
                <p className="review-venue">📍 {bookingResult?.venue}</p>
              </div>
            </div>
            <div className="order-rows">
              <div className="order-row">
                <span>Name</span>
                <strong>{bookingResult?.userName}</strong>
              </div>
              <div className="order-row">
                <span>Email</span>
                <strong style={{ fontSize: "0.85rem" }}>{bookingResult?.email}</strong>
              </div>
              <div className="order-row">
                <span>Tickets</span>
                <strong>{bookingResult?.ticketsBooked}</strong>
              </div>
              <div className="order-divider" />
              <div className="order-row total-row">
                <span>Total</span>
                <strong className="total-amount">₹{bookingResult?.totalAmount?.toFixed(2)}</strong>
              </div>
            </div>
            <div className="security-note">
              <span>🔒</span>
              <p>256-bit SSL encryption. Your payment data is never stored.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;
