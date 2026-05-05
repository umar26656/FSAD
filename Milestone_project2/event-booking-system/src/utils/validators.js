/**
 * Utility functions for validation and common operations
 */

// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone number validation
export const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/[-\s]/g, ''));
};

// Generate unique booking ID
export const generateBookingId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `BK${timestamp}${random}`;
};

// Format date
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-IN', options);
};

// Format time
export const formatTime = (timeString) => {
  return timeString; // Can add more formatting logic if needed
};

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

// Get time remaining for OTP
export const getTimeRemaining = (expiryTime) => {
  const now = Date.now();
  const remaining = Math.max(0, expiryTime - now);
  const seconds = Math.floor((remaining / 1000) % 60);
  const minutes = Math.floor((remaining / 1000 / 60) % 60);
  return { minutes, seconds, total: remaining };
};

// Validate booking data
export const validateBookingData = (data) => {
  const errors = [];

  if (!data.name || data.name.trim() === '') {
    errors.push('Name is required');
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Valid email is required');
  }

  if (!data.phoneNumber || !isValidPhoneNumber(data.phoneNumber)) {
    errors.push('Valid phone number is required');
  }

  if (!data.dept || data.dept.trim() === '') {
    errors.push('Department is required');
  }

  if (!data.numTickets || data.numTickets < 1) {
    errors.push('Number of tickets must be at least 1');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Store data in localStorage
export const storeData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error storing data:', error);
  }
};

// Retrieve data from localStorage
export const retrieveData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error retrieving data:', error);
    return null;
  }
};

// Clear data from localStorage
export const clearData = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};

// Debounce function
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Handle API errors
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    return error.response.data?.message || 'An error occurred';
  } else if (error.request) {
    // Request made but no response
    return 'No response from server';
  } else {
    // Error in request setup
    return error.message || 'An error occurred';
  }
};

// Generate QR code data
export const generateQRCodeData = (bookingId, email) => {
  return `https://veltech-events.com/verify?booking=${bookingId}&email=${encodeURIComponent(email)}`;
};

// Export all utilities as default
export default {
  isValidEmail,
  isValidPhoneNumber,
  generateBookingId,
  formatDate,
  formatTime,
  formatCurrency,
  getTimeRemaining,
  validateBookingData,
  storeData,
  retrieveData,
  clearData,
  debounce,
  handleApiError,
  generateQRCodeData,
};
