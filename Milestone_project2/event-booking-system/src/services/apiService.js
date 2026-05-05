import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  // OTP Methods
  sendOTP: (email) => apiClient.post('/otp/send', { email }),
  verifyOTP: (email, otp) => apiClient.post('/otp/verify', { email, otp }),
  
  // Booking Methods
  createBooking: (bookingData) => apiClient.post('/bookings', bookingData),
  getBooking: (bookingId) => apiClient.get(`/bookings/${bookingId}`),
  getAllBookings: () => apiClient.get('/bookings'),
  
  // Payment Methods
  initiatePayment: (paymentData) => apiClient.post('/payments/initiate', paymentData),
  verifyPayment: (paymentDetails) => apiClient.post('/payments/verify', paymentDetails),
  getPaymentStatus: (paymentId) => apiClient.get(`/payments/${paymentId}`),
  
  // Email Methods
  sendTicketEmail: (bookingId, email) => apiClient.post('/email/send-ticket', { bookingId, email }),
  sendConfirmationEmail: (email, bookingDetails) => apiClient.post('/email/send-confirmation', { email, bookingDetails }),
  
  // Event Methods
  getEvents: () => apiClient.get('/events'),
  getEventById: (eventId) => apiClient.get(`/events/${eventId}`),
  getAvailableTickets: (eventId) => apiClient.get(`/events/${eventId}/tickets`),
};

export default apiService;
