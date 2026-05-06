import axios from "axios";

const API_URL = "http://localhost:5000/api";

// ─── Events ──────────────────────────────────────────────────────────────────
export const getEvents = async () => {
  const response = await axios.get(`${API_URL}/events`);
  return response.data;
};

export const getEventById = async (id) => {
  const response = await axios.get(`${API_URL}/events/${id}`);
  return response.data;
};

// ─── Bookings ─────────────────────────────────────────────────────────────────
export const createBooking = async (bookingData) => {
  const response = await axios.post(`${API_URL}/bookings`, bookingData);
  return response.data;
};

export const completePayment = async (bookingId) => {
  const response = await axios.patch(`${API_URL}/bookings/${bookingId}/pay`);
  return response.data;
};

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};

// ─── Payment ──────────────────────────────────────────────────────────────────
export const getQRCode = async () => {
  const response = await axios.get(`${API_URL}/payment/qr`);
  return response.data;
};
