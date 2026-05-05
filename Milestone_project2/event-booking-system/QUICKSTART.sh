#!/bin/bash
# Quick Start Script for Event Booking System

echo "========================================="
echo "  VELTECH Event Booking System"
echo "  Advanced Features Setup"
echo "========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo "✅ npm found: $(npm --version)"
echo ""

# Frontend setup
echo "📦 Setting up Frontend..."
echo "  1. Installing dependencies..."
npm install

echo ""
echo "📝 Creating .env file for frontend..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "  ✅ .env created from template"
    echo "  ⚠️  Please edit .env and add your Razorpay Key ID"
else
    echo "  ℹ️  .env already exists"
fi

echo ""
echo "========================================="
echo "  SETUP COMPLETE!"
echo "========================================="
echo ""
echo "📋 Next Steps:"
echo ""
echo "1️⃣  Configure Environment Variables:"
echo "   • Edit .env file"
echo "   • Add REACT_APP_RAZORPAY_KEY_ID"
echo ""
echo "2️⃣  Setup Backend:"
echo "   • Install: npm install express cors dotenv nodemailer razorpay"
echo "   • Create backend .env from backend.env.example"
echo "   • Add Razorpay and Gmail credentials"
echo ""
echo "3️⃣  Start Development:"
echo "   • Terminal 1: npm start (Frontend on port 3000)"
echo "   • Terminal 2: node server.js (Backend on port 5000)"
echo ""
echo "4️⃣  Test the Application:"
echo "   • Open http://localhost:3000"
echo "   • Fill booking form"
echo "   • Proceed through OTP and Payment flow"
echo ""
echo "📚 Documentation:"
echo "   • README.md - Project overview"
echo "   • ADVANCED_FEATURES.md - Feature guide"
echo "   • IMPLEMENTATION_SUMMARY.md - Implementation details"
echo "   • ADDITIONAL_INTEGRATIONS.js - Integration examples"
echo ""
echo "🔐 Security Reminders:"
echo "   • Never commit .env files"
echo "   • Use production keys only in production"
echo "   • Enable HTTPS for production"
echo "   • Implement rate limiting"
echo ""
echo "========================================="
