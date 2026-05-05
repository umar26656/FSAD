/**
 * Additional API Integrations Examples
 * These are examples of how to extend the system with additional services
 */

// ===== SMS NOTIFICATIONS (Using Twilio) =====

const twilioExample = `
// Install: npm install twilio

const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

// Send OTP via SMS
async function sendOTPViaSMS(phoneNumber, otp) {
  try {
    const message = await client.messages.create({
      body: \`Your VELTECH Events OTP: \${otp}. Valid for 5 minutes.\`,
      from: fromNumber,
      to: phoneNumber,
    });
    console.log('SMS sent:', message.sid);
    return { success: true, messageId: message.sid };
  } catch (error) {
    console.error('SMS error:', error);
    return { success: false, error: error.message };
  }
}

// Add to backend route
app.post('/api/sms/send-otp', async (req, res) => {
  const { phoneNumber, otp } = req.body;
  const result = await sendOTPViaSMS(phoneNumber, otp);
  res.json(result);
});
`;

// ===== WHATSAPP NOTIFICATIONS (Using Twilio) =====

const whatsappExample = `
// Send booking confirmation via WhatsApp
async function sendWhatsAppConfirmation(phoneNumber, bookingDetails) {
  try {
    const message = await client.messages.create({
      body: \`Your booking for \${bookingDetails.eventName} is confirmed!\\nBooking ID: \${bookingDetails.bookingId}\\nTickets: \${bookingDetails.numTickets}\`,
      from: \`whatsapp:\${fromNumber}\`,
      to: \`whatsapp:\${phoneNumber}\`,
    });
    console.log('WhatsApp sent:', message.sid);
    return { success: true, messageId: message.sid };
  } catch (error) {
    console.error('WhatsApp error:', error);
    return { success: false, error: error.message };
  }
}

// Send reminder via WhatsApp
async function sendWhatsAppReminder(phoneNumber, eventData) {
  try {
    const reminderDate = new Date(eventData.eventDate);
    const message = await client.messages.create({
      body: \`Reminder: Your event \${eventData.eventName} is on \${reminderDate.toDateString()} at \${eventData.eventTime}. Venue: \${eventData.venue}\`,
      from: \`whatsapp:\${fromNumber}\`,
      to: \`whatsapp:\${phoneNumber}\`,
    });
    return { success: true, messageId: message.sid };
  } catch (error) {
    console.error('WhatsApp reminder error:', error);
    return { success: false, error: error.message };
  }
}
`;

// ===== PUSH NOTIFICATIONS (Using Firebase) =====

const pushNotificationExample = `
// Install: npm install firebase-admin

const admin = require('firebase-admin');
const serviceAccount = require('./firebase-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function sendPushNotification(deviceToken, title, body, data) {
  try {
    const message = {
      notification: { title, body },
      data: data,
      token: deviceToken,
    };

    const response = await admin.messaging().send(message);
    console.log('Push notification sent:', response);
    return { success: true, messageId: response };
  } catch (error) {
    console.error('Push notification error:', error);
    return { success: false, error: error.message };
  }
}

// Send booking confirmation
app.post('/api/notifications/push', async (req, res) => {
  const { deviceToken, title, body, data } = req.body;
  const result = await sendPushNotification(deviceToken, title, body, data);
  res.json(result);
});
`;

// ===== ANALYTICS (Using Google Analytics) =====

const analyticsExample = `
// Frontend - Add to App.js or tracking file
import { trackEvent } from '@react-ga/core';

// Track booking flow steps
function trackBookingStep(step) {
  trackEvent('booking', {
    step: step, // 'form', 'otp', 'payment', 'confirmation'
    timestamp: new Date().toISOString(),
  });
}

// Track payment attempts
function trackPaymentAttempt(bookingId, amount) {
  trackEvent('payment_attempt', {
    booking_id: bookingId,
    amount: amount,
  });
}

// Track payment completion
function trackPaymentSuccess(bookingId, paymentId) {
  trackEvent('payment_success', {
    booking_id: bookingId,
    payment_id: paymentId,
  });
}

// Backend - Log to analytics service
const analytics = require('./analytics');

app.post('/api/analytics/log', (req, res) => {
  const { eventType, data } = req.body;
  analytics.log({
    eventType,
    data,
    timestamp: new Date(),
  });
  res.json({ success: true });
});
`;

// ===== SMS/EMAIL QUEUE (Using Bull) =====

const queueExample = `
// Install: npm install bull redis

const Queue = require('bull');
const redis = require('redis');

// Create queues
const emailQueue = new Queue('emails', {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
  },
});

const smsQueue = new Queue('sms', { redis });

// Process email queue
emailQueue.process(5, async (job) => {
  console.log('Processing email:', job.data);
  // Send email using nodemailer
  return await emailTransporter.sendMail(job.data);
});

// Process SMS queue
smsQueue.process(10, async (job) => {
  console.log('Processing SMS:', job.data);
  // Send SMS using Twilio
  return await sendSMS(job.data.phoneNumber, job.data.message);
});

// Add to email queue
app.post('/api/email/queue', async (req, res) => {
  const { to, subject, html } = req.body;
  
  // Add to queue with retry options
  await emailQueue.add(
    { to, subject, html },
    {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
      removeOnComplete: true,
    }
  );

  res.json({ success: true, message: 'Added to queue' });
});
`;

// ===== DATABASE INTEGRATION (MongoDB) =====

const databaseExample = `
// Install: npm install mongoose

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Booking Schema
const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, unique: true },
  name: String,
  email: String,
  phoneNumber: String,
  dept: String,
  numTickets: Number,
  eventName: String,
  total: Number,
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'] },
  paymentId: String,
  createdAt: { type: Date, default: Date.now },
});

// Payment Schema
const paymentSchema = new mongoose.Schema({
  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String,
  bookingId: String,
  amount: Number,
  status: String,
  verifiedAt: Date,
  createdAt: { type: Date, default: Date.now },
});

// Email Log Schema
const emailLogSchema = new mongoose.Schema({
  to: String,
  subject: String,
  type: { type: String, enum: ['otp', 'ticket', 'confirmation', 'receipt', 'reminder'] },
  status: { type: String, enum: ['sent', 'failed', 'bounced'] },
  messageId: String,
  error: String,
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model('Booking', bookingSchema);
const Payment = mongoose.model('Payment', paymentSchema);
const EmailLog = mongoose.model('EmailLog', emailLogSchema);

// Use in routes
app.post('/api/bookings', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
`;

// ===== CACHING (Using Redis) =====

const cachingExample = `
// Install: npm install redis

const redis = require('redis');
const client = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
});

// Cache event details
async function getEventWithCache(eventId) {
  return new Promise((resolve, reject) => {
    const cacheKey = \`event:\${eventId}\`;
    
    // Try to get from cache
    client.get(cacheKey, (err, data) => {
      if (data) {
        return resolve(JSON.parse(data));
      }
      
      // Get from database
      const event = getEventFromDB(eventId);
      
      // Store in cache for 1 hour
      client.setex(cacheKey, 3600, JSON.stringify(event));
      resolve(event);
    });
  });
}

app.get('/api/events/:eventId', async (req, res) => {
  const event = await getEventWithCache(req.params.eventId);
  res.json(event);
});
`;

// ===== RATE LIMITING =====

const rateLimitExample = `
// Install: npm install express-rate-limit

const rateLimit = require('express-rate-limit');

// General rate limiter
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

// Strict rate limiter for OTP
const otpLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Max 5 OTP requests per hour per IP
  message: 'Too many OTP requests, please try again later.',
});

// Apply limiters
app.use('/api/', generalLimiter);
app.post('/api/otp/send', otpLimiter, (req, res) => {
  // OTP endpoint
});
`;

// ===== JWT AUTHENTICATION =====

const jwtExample = `
// Install: npm install jsonwebtoken

const jwt = require('jsonwebtoken');

// Generate token
function generateToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
}

// Verify token
function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Middleware to protect routes
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(403).json({ success: false, message: 'Invalid token' });
  }

  req.userId = decoded.userId;
  next();
}

// Use in protected routes
app.get('/api/user/bookings', authenticateToken, (req, res) => {
  // Protected endpoint
});
`;

// ===== PDF GENERATION (Using PDFKit) =====

const pdfExample = `
// Install: npm install pdfkit

const PDFDocument = require('pdfkit');
const fs = require('fs');

function generateTicketPDF(bookingData) {
  const doc = new PDFDocument();
  const filename = \`ticket_\${bookingData.bookingId}.pdf\`;

  doc.pipe(fs.createWriteStream(filename));

  // Add header
  doc.fontSize(25).text('EVENT TICKET', 100, 100);
  
  // Add booking details
  doc.fontSize(12).text(\`Event: \${bookingData.eventName}\`, 100, 150);
  doc.text(\`Date: \${bookingData.eventDate}\`, 100, 170);
  doc.text(\`Venue: \${bookingData.venue}\`, 100, 190);
  doc.text(\`Tickets: \${bookingData.numTickets}\`, 100, 210);
  
  // Add QR code
  const QRCode = require('qrcode');
  QRCode.toFile(\`qr_\${bookingData.bookingId}.png\`, bookingData.bookingId);

  doc.image(\`qr_\${bookingData.bookingId}.png\`, 100, 250, { width: 150 });
  
  doc.end();
  return filename;
}
`;

export default {
  twilioExample,
  whatsappExample,
  pushNotificationExample,
  analyticsExample,
  queueExample,
  databaseExample,
  cachingExample,
  rateLimitExample,
  jwtExample,
  pdfExample,
};
