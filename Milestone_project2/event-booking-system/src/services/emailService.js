/**
 * Email Service - Handles email notifications
 */

class EmailService {
  constructor() {
    this.apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  }

  /**
   * Send OTP email
   */
  async sendOTPEmail(email, otp, expiryTime = 5) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/api/email/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp,
          expiryTime,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send OTP email');
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending OTP email:', error);
      throw error;
    }
  }

  /**
   * Send booking confirmation email
   */
  async sendBookingConfirmation(bookingData) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/api/email/send-confirmation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error('Failed to send confirmation email');
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending confirmation email:', error);
      throw error;
    }
  }

  /**
   * Send ticket to email
   */
  async sendTicketEmail(ticketData) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/api/email/send-ticket`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData),
      });

      if (!response.ok) {
        throw new Error('Failed to send ticket email');
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending ticket email:', error);
      throw error;
    }
  }

  /**
   * Generate ticket PDF (to be sent via email)
   */
  generateTicketPDF(bookingData) {
    const {
      bookingId,
      name,
      email,
      eventName,
      eventDate,
      eventTime,
      venue,
      numTickets,
      total,
      department,
    } = bookingData;

    // Generate QR code data (can be encoded with booking ID)
    const qrData = `BOOKING:${bookingId}`;

    return {
      bookingId,
      name,
      email,
      eventName,
      eventDate,
      eventTime,
      venue,
      numTickets,
      total,
      department,
      qrCode: qrData,
      generatedAt: new Date().toISOString(),
    };
  }

  /**
   * Send payment receipt
   */
  async sendPaymentReceipt(receiptData) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/api/email/send-receipt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(receiptData),
      });

      if (!response.ok) {
        throw new Error('Failed to send receipt');
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending receipt:', error);
      throw error;
    }
  }

  /**
   * Send reminder email
   */
  async sendReminderEmail(email, eventData, daysUntil) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/api/email/send-reminder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          eventData,
          daysUntil,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send reminder email');
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending reminder email:', error);
      throw error;
    }
  }
}

export default new EmailService();
