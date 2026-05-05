# Event Booking System - Advanced Features Guide

A sophisticated event booking system with OTP verification, payment gateway integration, and automated email notifications.

## Features

### 🔐 Advanced Security
- **OTP Verification**: 6-digit one-time passwords with 5-minute expiry
- **Email Verification**: Secure email-based authentication
- **Razorpay Integration**: Secure payment processing with signature verification

### 💳 Payment Processing
- **Razorpay Payment Gateway**: PCI-DSS compliant payment processing
- **Payment Verification**: Cryptographic signature verification
- **Transaction Management**: Complete payment tracking and history

### 📧 Email Notifications
- **OTP Delivery**: Automated OTP emails
- **Ticket Distribution**: PDF tickets sent to email
- **Booking Confirmation**: Detailed confirmation emails
- **Payment Receipts**: Automated receipt generation
- **Event Reminders**: Pre-event reminder emails

### 📋 Enhanced Booking System
- **Multi-step Process**: Form → OTP → Payment → Confirmation
- **Step Indicator**: Visual progress tracking
- **Real-time Validation**: Comprehensive form validation
- **Phone Number Field**: International phone number support

## Installation & Setup

### Frontend Setup

1. **Install dependencies:**
   ```bash
   cd event-booking-system
   npm install
   ```

2. **Create `.env` file (copy from `.env.example`):**
   ```bash
   cp .env.example .env
   ```

3. **Configure environment variables:**
   ```env
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_RAZORPAY_KEY_ID=rzp_test_your_key_id
   ```

4. **Start frontend:**
   ```bash
   npm start
   ```

### Backend Setup

1. **Install Node.js dependencies:**
   ```bash
   npm install express cors dotenv nodemailer razorpay body-parser
   ```

2. **Create `.env` file (copy from `backend.env.example`):**
   ```bash
   cp backend.env.example .env
   ```

3. **Configure environment variables:**
   ```env
   PORT=5000
   EMAIL_USER=your_gmail@gmail.com
   EMAIL_PASSWORD=your_app_password
   RAZORPAY_KEY_ID=rzp_test_your_key_id
   RAZORPAY_KEY_SECRET=rzp_test_your_key_secret
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start backend server:**
   ```bash
   node server.js
   ```

## Configuration Details

### Razorpay Setup

1. Create account at [Razorpay.com](https://razorpay.com)
2. Get your API credentials from dashboard
3. Add credentials to `.env`
4. For testing, use Razorpay test cards

### Gmail Setup (for Email)

1. Enable 2-factor authentication on Gmail
2. Generate App Password:
   - Go to Google Account → Security
   - Generate App Password for "Mail"
   - Use this in `EMAIL_PASSWORD`

### Email Configuration (Alternative)

To use other email services, modify the transporter in `server.js`:

```javascript
// For Outlook
const emailTransporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// For SendGrid
const emailTransporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY,
  },
});
```

## API Endpoints

### OTP Management
- `POST /api/otp/send` - Send OTP to email
- `POST /api/otp/verify` - Verify OTP

### Booking Management
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:bookingId` - Get booking details

### Payment Processing
- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify` - Verify payment signature
- `GET /api/payments/:paymentId` - Get payment status

### Email Notifications
- `POST /api/email/send-otp` - Send OTP email
- `POST /api/email/send-ticket` - Send ticket via email
- `POST /api/email/send-confirmation` - Send confirmation email
- `POST /api/email/send-receipt` - Send payment receipt
- `POST /api/email/send-reminder` - Send event reminder

## Booking Flow

```
1. User fills booking form (Name, Email, Phone, Department, Tickets)
   ↓
2. System sends OTP to email
   ↓
3. User enters OTP (6 digits, 5-minute validity)
   ↓
4. OTP verified → Payment page
   ↓
5. User clicks "Proceed to Payment"
   ↓
6. Razorpay payment window opens
   ↓
7. Payment successful → Confirmation page
   ↓
8. Tickets sent to email automatically
   ↓
9. Confirmation email with booking details
```

## File Structure

```
event-booking-system/
├── src/
│   ├── components/
│   │   ├── BookingForm.js          # Enhanced form with validation
│   │   ├── OTPVerification.js      # OTP input & verification
│   │   ├── PaymentComponent.js     # Razorpay integration
│   │   ├── BookingSummary.js       # Confirmation & ticket delivery
│   │   ├── EventDetails.js         # Event information display
│   ├── services/
│   │   ├── apiService.js           # API client with interceptors
│   │   ├── otpService.js           # OTP logic
│   │   ├── paymentService.js       # Razorpay integration
│   │   ├── emailService.js         # Email operations
│   ├── utils/
│   │   ├── validators.js           # Validation utilities
│   ├── App.js                      # Main app with state management
│   ├── App.css                     # Complete styling
├── server.js                        # Backend API server
├── package.json                     # Dependencies
├── .env.example                     # Frontend env template
└── backend.env.example              # Backend env template
```

## Security Best Practices

1. **Never commit `.env` files** - Add to `.gitignore`
2. **Use HTTPS in production** - Implement SSL/TLS
3. **Validate all inputs** - Both frontend and backend
4. **Rate limiting** - Implement to prevent abuse
5. **Database encryption** - Use MongoDB Atlas with encryption
6. **CORS configuration** - Restrict to trusted domains
7. **API authentication** - Add JWT tokens for sensitive endpoints
8. **Signature verification** - Always verify Razorpay signatures

## Testing

### Test Razorpay Cards
- **Success**: 4111 1111 1111 1111
- **Failure**: 4222 2222 2222 2222
- **Any CVV and future date**

### Test OTP
- Enter any 6-digit number during testing
- In production, OTP is sent via email

## Troubleshooting

### Email not sending
- Check Gmail 2FA and App Password
- Verify email credentials in `.env`
- Check spam folder
- Ensure backend server is running

### Payment not working
- Verify Razorpay credentials
- Check browser console for errors
- Ensure CORS is properly configured
- Test with Razorpay test keys

### OTP expired
- Default expiry is 5 minutes
- User can request new OTP
- Maximum 3 verification attempts

### CORS issues
- Ensure backend CORS is configured
- Frontend URL should match in backend
- Check origin header in requests

## Performance Optimization

1. **Frontend**
   - Lazy load components
   - Memoize expensive calculations
   - Optimize re-renders

2. **Backend**
   - Use connection pooling
   - Implement caching
   - Add database indexing

3. **Email**
   - Queue email jobs
   - Use async sending
   - Batch process emails

## Production Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy build folder
```

### Backend (Heroku/AWS/GCP)
```bash
# Add Procfile
echo "web: node server.js" > Procfile

# Deploy with environment variables
```

## Database Integration (Optional)

Replace in-memory storage with MongoDB:

```javascript
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: String,
  name: String,
  email: String,
  // ... other fields
});

const Booking = mongoose.model('Booking', bookingSchema);
```

## API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* ... */ }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": { /* ... */ }
}
```

## Monitoring & Logging

Add logging to monitor system:
```javascript
const logger = require('winston');

logger.info('OTP sent to ' + email);
logger.error('Payment verification failed', error);
```

## Support & Maintenance

- Regular security audits
- Monitor payment failures
- Track email delivery rates
- Update dependencies
- Backup database regularly

## License

This project is licensed under MIT License.

## Contact

For support: events@veltech.edu.in

---

**Last Updated**: May 2026
**Version**: 2.0 (Advanced Features)
