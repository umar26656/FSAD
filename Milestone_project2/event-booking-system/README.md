# VELTECH Event Booking System - Advanced Edition

A modern, feature-rich event booking system with OTP verification, secure payments, and automated email notifications.

## ✨ Features

### 🔐 Security & Authentication
- **OTP Verification**: 6-digit one-time passwords with 5-minute expiry
- **Email Verification**: Secure email-based authentication flow
- **Password Hashing**: Secure storage of sensitive data
- **API Token Management**: JWT-based authentication (optional)

### 💳 Payment Processing
- **Razorpay Integration**: Secure, PCI-DSS compliant payment gateway
- **Transaction Management**: Complete payment tracking and verification
- **Multiple Payment Methods**: Cards, UPI, Wallets, Netbanking
- **Invoice Generation**: Automated receipt creation

### 📧 Email System
- **OTP Delivery**: Automated OTP emails with HTML templates
- **Ticket Distribution**: PDF tickets sent to registered email
- **Booking Confirmation**: Detailed booking confirmation emails
- **Payment Receipts**: Automated receipt generation
- **Event Reminders**: Pre-event reminder notifications

### 📋 Enhanced Booking
- **Multi-step Booking**: Form → OTP → Payment → Confirmation
- **Progress Tracking**: Visual step indicator
- **Real-time Validation**: Comprehensive field validation
- **Responsive Design**: Mobile-friendly interface

### 📊 Additional Integrations (Examples Provided)
- SMS Notifications (Twilio)
- WhatsApp Messaging
- Push Notifications (Firebase)
- Analytics Tracking
- Message Queue (Bull/Redis)
- Database Integration (MongoDB)
- Caching (Redis)
- Rate Limiting
- PDF Generation

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Razorpay Account
- Gmail Account (for emails)

### Frontend Setup

```bash
# 1. Navigate to project
cd event-booking-system

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env

# 4. Configure environment variables
# Edit .env with your Razorpay key

# 5. Start development server
npm start
```

### Backend Setup

```bash
# 1. Install backend dependencies
npm install express cors dotenv nodemailer razorpay

# 2. Create backend .env
cp backend.env.example .env

# 3. Configure environment variables
# - RAZORPAY_KEY_ID
# - RAZORPAY_KEY_SECRET
# - EMAIL_USER (Gmail)
# - EMAIL_PASSWORD (App password)

# 4. Start backend server
node server.js
```

## 📁 Project Structure

```
event-booking-system/
├── src/
│   ├── components/
│   │   ├── BookingForm.js          # Enhanced booking form
│   │   ├── OTPVerification.js      # OTP input component
│   │   ├── PaymentComponent.js     # Payment gateway
│   │   ├── BookingSummary.js       # Confirmation page
│   │   └── EventDetails.js         # Event information
│   ├── services/
│   │   ├── apiService.js           # API client
│   │   ├── otpService.js           # OTP logic
│   │   ├── paymentService.js       # Razorpay wrapper
│   │   └── emailService.js         # Email client
│   ├── utils/
│   │   └── validators.js           # Helper functions
│   ├── App.js                      # Main app component
│   └── App.css                     # Styling
├── server.js                        # Backend API
├── package.json                     # Dependencies
├── ADVANCED_FEATURES.md             # Detailed feature guide
├── ADDITIONAL_INTEGRATIONS.js       # Integration examples
└── README.md                        # This file
```

## 🔧 Configuration

### Razorpay Setup
1. Create account at [razorpay.com](https://razorpay.com)
2. Get API credentials from dashboard
3. Update `.env` with credentials
4. Use test cards for testing

### Email Configuration
1. Enable 2FA on Gmail
2. Generate App Password
3. Use in `EMAIL_PASSWORD` env variable

See [ADVANCED_FEATURES.md](ADVANCED_FEATURES.md) for detailed setup instructions.

## 📚 API Documentation

### OTP Endpoints
```
POST /api/otp/send          - Send OTP to email
POST /api/otp/verify        - Verify OTP code
```

### Booking Endpoints
```
POST /api/bookings          - Create booking
GET  /api/bookings/:id      - Get booking details
```

### Payment Endpoints
```
POST /api/payments/create-order    - Create Razorpay order
POST /api/payments/verify          - Verify payment
GET  /api/payments/:id             - Get payment status
```

### Email Endpoints
```
POST /api/email/send-otp           - Send OTP email
POST /api/email/send-ticket        - Send ticket email
POST /api/email/send-confirmation  - Send confirmation
POST /api/email/send-receipt       - Send receipt
POST /api/email/send-reminder      - Send reminder
```

## 🔄 Booking Flow

```
User Registration & Validation
    ↓
Send OTP to Email
    ↓
User Enters OTP (5-minute window)
    ↓
OTP Verification Success
    ↓
Display Payment Details
    ↓
Razorpay Payment Window
    ↓
Payment Processing
    ↓
Signature Verification
    ↓
Generate Booking Confirmation
    ↓
Send Ticket via Email
    ↓
Send Confirmation Email
    ↓
Display Success Page
```

## 🧪 Testing

### Test Razorpay Cards
```
Success Card:    4111 1111 1111 1111
Failure Card:    4222 2222 2222 2222
CVV:            Any 3-digit number
Expiry:         Any future date (MM/YY)
```

### Test OTP
During development, any 6-digit number works. In production, OTP is sent via email.

## 🛡️ Security Features

- ✅ OTP Verification (prevents duplicate bookings)
- ✅ Email Validation
- ✅ Phone Number Validation
- ✅ Razorpay Signature Verification
- ✅ CORS Configuration
- ✅ Input Sanitization
- ✅ Error Handling
- ✅ Rate Limiting (examples provided)

## 📱 Responsive Design

- Mobile-first approach
- Tested on iOS and Android
- Touch-friendly buttons
- Optimized loading times
- Accessible color schemes

## 🚢 Production Deployment

### Frontend
```bash
npm run build
# Deploy build/ folder to Vercel, Netlify, or AWS S3
```

### Backend
```bash
# Deploy to Heroku, AWS, or DigitalOcean
# Set environment variables on hosting platform
git push heroku main
```

## 📖 Additional Resources

- [Advanced Features Guide](ADVANCED_FEATURES.md)
- [Integration Examples](ADDITIONAL_INTEGRATIONS.js)
- [Razorpay Docs](https://razorpay.com/docs/)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/docs/)

## 🐛 Troubleshooting

**Issue**: Emails not sending
- Check Gmail App Password
- Verify `.env` configuration
- Check spam folder

**Issue**: Payment not working
- Verify Razorpay credentials
- Check browser console
- Ensure CORS is enabled

**Issue**: OTP not received
- Check spam folder
- Verify email configuration
- Check network connectivity

## 📊 Performance Tips

1. Enable caching for event details
2. Use lazy loading for components
3. Optimize images (< 100KB)
4. Minimize CSS/JS
5. Use CDN for static files

## 🤝 Contributing

Pull requests are welcome! Please follow the existing code style.

## 📝 License

MIT License - see LICENSE file

## 📞 Support

- Email: events@veltech.edu.in
- Phone: +91-XXXXXXXXXX
- Issues: GitHub Issues

## 📌 Changelog

### v2.0 (Advanced Features)
- ✨ OTP Verification system
- 💳 Razorpay payment integration
- 📧 Email notifications
- 📱 Responsive design
- 🔐 Enhanced security

### v1.0 (Initial Release)
- Basic booking form
- Event details display
- Booking confirmation

---

**Last Updated**: May 2026  
**Maintained By**: VELTECH Events Team  
**Version**: 2.0

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
