/**
 * OTP Service - Handles OTP generation, sending, and verification
 */

class OTPService {
  constructor() {
    this.otpStore = {}; // In production, use database
    this.OTP_VALIDITY = 5 * 60 * 1000; // 5 minutes
    this.MAX_ATTEMPTS = 3;
  }

  /**
   * Generate OTP
   */
  generateOTP(length = 6) {
    return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)).toString();
  }

  /**
   * Send OTP to email
   */
  async sendOTPToEmail(email) {
    try {
      const otp = this.generateOTP();
      const expiresAt = Date.now() + this.OTP_VALIDITY;
      
      // Store OTP locally (in production, use backend)
      this.otpStore[email] = {
        otp,
        expiresAt,
        attempts: 0,
      };

      // In production, call backend to send email
      console.log(`OTP for ${email}: ${otp}`);
      
      return {
        success: true,
        message: 'OTP sent successfully',
        expiresIn: this.OTP_VALIDITY / 1000, // seconds
      };
    } catch (error) {
      console.error('Error sending OTP:', error);
      return {
        success: false,
        message: 'Failed to send OTP',
        error: error.message,
      };
    }
  }

  /**
   * Verify OTP
   */
  verifyOTP(email, enteredOTP) {
    try {
      const otpData = this.otpStore[email];

      if (!otpData) {
        return {
          success: false,
          message: 'OTP not found for this email',
        };
      }

      if (Date.now() > otpData.expiresAt) {
        delete this.otpStore[email];
        return {
          success: false,
          message: 'OTP has expired',
        };
      }

      if (otpData.attempts >= this.MAX_ATTEMPTS) {
        delete this.otpStore[email];
        return {
          success: false,
          message: 'Maximum OTP attempts exceeded',
        };
      }

      if (otpData.otp !== enteredOTP) {
        otpData.attempts += 1;
        return {
          success: false,
          message: `Invalid OTP. ${this.MAX_ATTEMPTS - otpData.attempts} attempts remaining`,
        };
      }

      delete this.otpStore[email];
      return {
        success: true,
        message: 'OTP verified successfully',
      };
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return {
        success: false,
        message: 'Error verifying OTP',
        error: error.message,
      };
    }
  }

  /**
   * Resend OTP
   */
  async resendOTP(email) {
    delete this.otpStore[email];
    return this.sendOTPToEmail(email);
  }

  /**
   * Clear OTP
   */
  clearOTP(email) {
    delete this.otpStore[email];
  }
}

export default new OTPService();
