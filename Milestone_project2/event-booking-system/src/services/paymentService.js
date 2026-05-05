/**
 * Payment Service - Handles Razorpay payment integration
 */

class PaymentService {
  constructor() {
    this.razorpayKey = process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_key';
  }

  /**
   * Load Razorpay script
   */
  loadRazorpayScript() {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  /**
   * Initiate payment
   */
  async initiatePayment(paymentDetails) {
    const {
      amount,
      currency = 'INR',
      email,
      name,
      phoneNumber,
      description,
      bookingId,
      onSuccess,
      onFailure,
    } = paymentDetails;

    try {
      const scriptLoaded = await this.loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay script');
      }

      // Create order from backend
      const orderResponse = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/payments/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Convert to paise
          currency,
          receipt: `receipt_${bookingId}`,
          notes: {
            bookingId,
            email,
          },
        }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create payment order');
      }

      const { order } = await orderResponse.json();

      // Open Razorpay payment window
      const options = {
        key: this.razorpayKey,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: 'VELTECH Events',
        description,
        image: 'https://veltech.edu.in/assets/img/logo.png',
        prefill: {
          email,
          contact: phoneNumber,
          name,
        },
        handler: (response) => {
          this.verifyPayment(response, bookingId, onSuccess, onFailure);
        },
        modal: {
          ondismiss: () => {
            onFailure({
              error: 'Payment cancelled by user',
            });
          },
        },
        theme: {
          color: '#4A90E2',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      return { success: true, message: 'Payment initiated' };
    } catch (error) {
      console.error('Payment initiation error:', error);
      onFailure(error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Verify payment
   */
  async verifyPayment(paymentResponse, bookingId, onSuccess, onFailure) {
    try {
      const verifyResponse = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/payments/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          razorpay_order_id: paymentResponse.razorpay_order_id,
          razorpay_payment_id: paymentResponse.razorpay_payment_id,
          razorpay_signature: paymentResponse.razorpay_signature,
          bookingId,
        }),
      });

      const result = await verifyResponse.json();

      if (result.success) {
        onSuccess(result);
      } else {
        onFailure(result.error);
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      onFailure(error);
    }
  }

  /**
   * Check payment status
   */
  async checkPaymentStatus(paymentId) {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/payments/${paymentId}`);
      return await response.json();
    } catch (error) {
      console.error('Error checking payment status:', error);
      throw error;
    }
  }

  /**
   * Format amount for display
   */
  formatAmount(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  }
}

export default new PaymentService();
