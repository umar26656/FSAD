import React, { useState, useEffect } from 'react';
import otpService from '../services/otpService';
import { getTimeRemaining } from '../utils/validators';

const OTPVerification = ({ email, onOTPVerified, onBack }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);

  // Timer for OTP expiry
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          setError('OTP has expired. Please request a new one.');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Enable resend after 30 seconds
  useEffect(() => {
    if (timeRemaining > 270) {
      setCanResend(false);
    } else if (timeRemaining <= 30 && timeRemaining > 0) {
      setCanResend(true);
    }
  }, [timeRemaining]);

  const handleVerify = async (e) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const result = otpService.verifyOTP(email, otp);
      
      if (result.success) {
        setError('');
        onOTPVerified(true);
      } else {
        setError(result.message);
        setOtp('');
      }
    } catch (err) {
      setError('Error verifying OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const result = await otpService.resendOTP(email);
      if (result.success) {
        setOtp('');
        setError('');
        setTimeRemaining(300);
        setCanResend(false);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Error sending OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="card otp-card">
      <h3>Email Verification</h3>
      <p className="otp-subtitle">Enter the 6-digit OTP sent to {email}</p>
      
      <form onSubmit={handleVerify}>
        <div className="input-group">
          <label>One-Time Password (OTP)</label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="000000"
            value={otp}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 6);
              setOtp(value);
            }}
            maxLength="6"
            disabled={loading || timeRemaining === 0}
            className="otp-input"
          />
        </div>

        <div className="timer-section">
          <span className={`timer ${timeRemaining < 60 ? 'warning' : ''}`}>
            {minutes}:{seconds.toString().padStart(2, '0')}
          </span>
          <span className="timer-label">Time remaining</span>
        </div>

        {error && <p className="error-msg">{error}</p>}

        <div className="button-group">
          <button 
            type="submit" 
            className="btn-primary" 
            disabled={loading || timeRemaining === 0}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
          <button 
            type="button" 
            className="btn-secondary" 
            onClick={onBack}
            disabled={loading}
          >
            Back
          </button>
        </div>

        <div className="resend-section">
          <p>Didn't receive the code?</p>
          <button
            type="button"
            className={`btn-link ${!canResend || loading ? 'disabled' : ''}`}
            onClick={handleResendOTP}
            disabled={!canResend || loading}
          >
            Resend OTP
          </button>
        </div>
      </form>
    </div>
  );
};

export default OTPVerification;
