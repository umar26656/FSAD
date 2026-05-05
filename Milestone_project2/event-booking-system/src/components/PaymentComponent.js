import React, { useState, useEffect } from 'react';
import paymentService from '../services/paymentService';
import { formatCurrency } from '../utils/validators';

const PaymentComponent = ({ bookingData, event, onPaymentSuccess, onPaymentFailure, onBack }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPaymentDetails, setShowPaymentDetails] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('razorpay'); // 'razorpay' or 'qr'
  const [qrImageUrl, setQrImageUrl] = useState(''); // Bank QR code image
  const [confirmPayment, setConfirmPayment] = useState(false);

  useEffect(() => {
    // Load Razorpay script on component mount
    const loadScript = async () => {
      const loaded = await paymentService.loadRazorpayScript();
      if (!loaded) {
        setError('Failed to load payment gateway. Please try again later.');
      }
    };
    loadScript();
  }, []);

  const handleQRCodePayment = async () => {
    // Simulate QR code payment
    setLoading(true);
    setError('');

    try {
      // Create a simulated payment response for QR code
      const simulatedPaymentId = 'pay_' + Math.random().toString(36).substr(2, 9);
      
      const paymentResponse = {
        razorpay_payment_id: simulatedPaymentId,
        razorpay_order_id: 'order_' + bookingData.bookingId,
        razorpay_signature: 'sig_' + Math.random().toString(36).substr(2, 9),
      };

      // Verify the payment
      await paymentService.verifyPayment(
        paymentResponse,
        bookingData.bookingId,
        (response) => {
          setLoading(false);
          setShowPaymentDetails(false);
          onPaymentSuccess(response);
        },
        (error) => {
          setLoading(false);
          setError('QR code payment verification failed. Please try again.');
          onPaymentFailure(error);
        }
      );
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Error processing QR payment. Please try again.');
    }
  };

  const handleQRImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setQrImageUrl(event.target.result);
        setConfirmPayment(false); // Reset confirmation when new QR is uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmQRPayment = () => {
    if (!qrImageUrl) {
      setError('Please upload a QR code image first');
      return;
    }
    setConfirmPayment(true);
  };

  const handleInitiatePayment = async () => {
    setLoading(true);
    setError('');

    try {
      const paymentDetails = {
        amount: bookingData.total,
        currency: 'INR',
        email: bookingData.email,
        name: bookingData.name,
        phoneNumber: bookingData.phoneNumber || '9876543210',
        description: `Booking for ${event.name} - ${bookingData.numTickets} ticket(s)`,
        bookingId: bookingData.bookingId,
        onSuccess: (response) => {
          setLoading(false);
          setShowPaymentDetails(false);
          onPaymentSuccess(response);
        },
        onFailure: (error) => {
          setLoading(false);
          setError(error?.error?.description || 'Payment failed. Please try again.');
          onPaymentFailure(error);
        },
      };

      await paymentService.initiatePayment(paymentDetails);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Error initiating payment. Please try again.');
    }
  };

  return (
    <div className="card payment-card">
      <h3>Payment Details</h3>

      {showPaymentDetails && (
        <>
          <div className="payment-details">
            <div className="detail-row">
              <span>Event Name:</span>
              <span>{event.name}</span>
            </div>
            <div className="detail-row">
              <span>Number of Tickets:</span>
              <span>{bookingData.numTickets}</span>
            </div>
            <div className="detail-row">
              <span>Price per Ticket:</span>
              <span>{formatCurrency(event.price)}</span>
            </div>
            <div className="detail-row">
              <span>Tax (0%):</span>
              <span>{formatCurrency(0)}</span>
            </div>
            <div className="detail-row total-row">
              <span>Total Amount:</span>
              <span className="total-amount">{formatCurrency(bookingData.total)}</span>
            </div>
          </div>

          <div className="payment-info">
            <div className="info-section">
              <h4>Booking Information</h4>
              <p><strong>Name:</strong> {bookingData.name}</p>
              <p><strong>Email:</strong> {bookingData.email}</p>
              <p><strong>Department:</strong> {bookingData.dept}</p>
            </div>

            <div className="security-info">
              <span>🔒</span>
              <p>Payments are secured with Razorpay</p>
            </div>
          </div>

          {error && <p className="error-msg">{error}</p>}

          <div className="button-group">
            <button
              className="btn-primary"
              onClick={handleInitiatePayment}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Proceed to Payment'}
            </button>
            <button
              className="btn-secondary"
              onClick={onBack}
              disabled={loading}
            >
              Back
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentComponent;
