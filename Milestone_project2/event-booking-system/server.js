/**
 * Backend Server for Event Booking System
 * Install: npm install express cors dotenv nodemailer body-parser
 * Run: node server.js
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Email Configuration (with fallback)
const emailTransporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USER || 'test@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'test_password',
  },
});

// In-memory storage (use database in production)
const bookingsStore = [];


app.post('/api/bookings', (req, res) => {
  try {
    const { bookingId, name, email, phoneNumber, dept, numTickets, eventName, total } = req.body;

    const booking = {
      bookingId,
      name,
      email,
      phoneNumber,
      dept,
      numTickets,
      eventName,
      total,
      createdAt: new Date(),
      status: 'confirmed',
    };

    bookingsStore.push(booking);
    res.json({ success: true, booking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/bookings/:bookingId', (req, res) => {
  try {
    const booking = bookingsStore.find(b => b.bookingId === req.params.bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.json({ success: true, booking });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ===== EMAIL ROUTES =====

// Confirmation email after booking

app.post('/api/email/send-ticket', (req, res) => {
  try {
    const { email, name, bookingId, eventName, eventDate, eventTime, venue, numTickets, total } = req.body;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Your Event Tickets - ${eventName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2>Your Event Tickets</h2>
          <p>Dear ${name},</p>
          <p>Thank you for booking with VELTECH Events!</p>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>${eventName}</h3>
            <p><strong>Date:</strong> ${eventDate}</p>
            <p><strong>Time:</strong> ${eventTime}</p>
            <p><strong>Venue:</strong> ${venue}</p>
            <p><strong>Tickets:</strong> ${numTickets}</p>
            <p><strong>Total Amount Paid:</strong> ₹${total}</p>
            <p><strong>Booking ID:</strong> ${bookingId}</p>
          </div>
          <p>Please bring a valid ID and this confirmation to the event.</p>
          <p>For any queries, contact us at events@veltech.edu.in</p>
        </div>
      `,
    };

    emailTransporter.sendMail(mailOptions, (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Failed to send ticket' });
      }
      res.json({ success: true, message: 'Ticket sent to email' });
    });
  } catch (error) {
    console.error('Error sending ticket email:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/api/email/send-confirmation', (req, res) => {
  try {
    const { email, name, bookingId, bookingDetails } = req.body;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Booking Confirmation - VELTECH Events',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2>Booking Confirmed ✓</h2>
          <p>Dear ${name},</p>
          <p>Your booking has been confirmed successfully!</p>
          <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>${bookingDetails.eventName}</h3>
            <p><strong>Date:</strong> ${bookingDetails.eventDate}</p>
            <p><strong>Time:</strong> ${bookingDetails.eventTime}</p>
            <p><strong>Venue:</strong> ${bookingDetails.venue}</p>
            <p><strong>Tickets Booked:</strong> ${bookingDetails.numTickets}</p>
            <p><strong>Total Amount:</strong> ₹${bookingDetails.total}</p>
            <p><strong>Payment Status:</strong> ${bookingDetails.paymentStatus}</p>
            <p><strong>Booking ID:</strong> ${bookingId}</p>
          </div>
          <p>Your tickets have been attached. Please bring them along with a valid ID.</p>
          <p>We look forward to seeing you there!</p>
        </div>
      `,
    };

    emailTransporter.sendMail(mailOptions, (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Failed to send confirmation' });
      }
      res.json({ success: true, message: 'Confirmation sent to email' });
    });
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/api/email/send-reminder', (req, res) => {
  try {
    const { email, eventData, daysUntil } = req.body;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Reminder: ${eventData.eventName} in ${daysUntil} days!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2>Event Reminder!</h2>
          <p>Don't forget about your upcoming event:</p>
          <div style="background: #fff3cd; padding: 20px; border-radius: 8px;">
            <h3>${eventData.eventName}</h3>
            <p><strong>Date:</strong> ${eventData.eventDate}</p>
            <p><strong>Time:</strong> ${eventData.eventTime}</p>
            <p><strong>Venue:</strong> ${eventData.venue}</p>
          </div>
          <p>See you there!</p>
        </div>
      `,
    };

    emailTransporter.sendMail(mailOptions, (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Failed to send reminder' });
      }
      res.json({ success: true, message: 'Reminder sent to email' });
    });
  } catch (error) {
    console.error('Error sending reminder email:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ===== HEALTH CHECK =====

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

// ===== ERROR HANDLING =====

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('API Base URL: http://localhost:' + PORT);
});
