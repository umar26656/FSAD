const nodemailer = require("nodemailer");

// Create email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send ticket confirmation email
const sendTicketConfirmation = async (booking, event) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: booking.email,
      subject: `Ticket Confirmation - ${event.name} 🎟️`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #333; text-align: center;">✅ Ticket Booking Confirmed!</h2>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Dear ${booking.userName},</strong></p>
            <p style="margin: 10px 0;">Thank you for booking your ticket! Your booking details are below:</p>
          </div>

          <h3 style="color: #444; border-bottom: 2px solid #007bff; padding-bottom: 10px;">Booking Details</h3>
          <table style="width: 100%; margin: 15px 0; border-collapse: collapse;">
            <tr style="background-color: #f0f0f0;">
              <td style="padding: 10px; font-weight: bold;">Booking ID:</td>
              <td style="padding: 10px;">${booking.id}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Email:</td>
              <td style="padding: 10px;">${booking.email}</td>
            </tr>
            <tr style="background-color: #f0f0f0;">
              <td style="padding: 10px; font-weight: bold;">Phone:</td>
              <td style="padding: 10px;">${booking.phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Department:</td>
              <td style="padding: 10px;">${booking.department}</td>
            </tr>
          </table>

          <h3 style="color: #444; border-bottom: 2px solid #28a745; padding-bottom: 10px;">Event Details</h3>
          <table style="width: 100%; margin: 15px 0; border-collapse: collapse;">
            <tr style="background-color: #f0f0f0;">
              <td style="padding: 10px; font-weight: bold;">Event Name:</td>
              <td style="padding: 10px;">${event.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Date:</td>
              <td style="padding: 10px;">${new Date(event.startDate).toLocaleDateString('en-IN')} - ${new Date(event.endDate).toLocaleDateString('en-IN')}</td>
            </tr>
            <tr style="background-color: #f0f0f0;">
              <td style="padding: 10px; font-weight: bold;">Time:</td>
              <td style="padding: 10px;">${new Date(event.startDate).toLocaleTimeString('en-IN')} - ${new Date(event.endDate).toLocaleTimeString('en-IN')}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Venue:</td>
              <td style="padding: 10px;">${event.venue}</td>
            </tr>
          </table>

          <h3 style="color: #444; border-bottom: 2px solid #ffc107; padding-bottom: 10px;">Ticket Details</h3>
          <table style="width: 100%; margin: 15px 0; border-collapse: collapse;">
            <tr style="background-color: #f0f0f0;">
              <td style="padding: 10px; font-weight: bold;">Number of Tickets:</td>
              <td style="padding: 10px;">${booking.ticketsBooked}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Price per Ticket:</td>
              <td style="padding: 10px;">₹${event.ticketPrice}</td>
            </tr>
            <tr style="background-color: #e8f5e9;">
              <td style="padding: 10px; font-weight: bold; font-size: 16px;">Total Amount:</td>
              <td style="padding: 10px; font-weight: bold; font-size: 16px; color: #28a745;">₹${booking.totalAmount}</td>
            </tr>
            <tr style="background-color: ${booking.paymentStatus === 'paid' ? '#e8f5e9' : '#fff3cd'};">
              <td style="padding: 10px; font-weight: bold;">Payment Status:</td>
              <td style="padding: 10px; color: ${booking.paymentStatus === 'paid' ? '#28a745' : '#ff9800'}; font-weight: bold;">${booking.paymentStatus.toUpperCase()}</td>
            </tr>
          </table>

          <div style="background-color: #e8f5e9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 10px 0; color: #333;"><strong>Next Steps:</strong></p>
            <ul style="margin: 10px 0; color: #333;">
              <li>Complete your payment via the booking portal</li>
              <li>Keep this confirmation email for reference</li>
              <li>Arrive 15 minutes before the event</li>
            </ul>
          </div>

          <p style="text-align: center; color: #999; font-size: 12px; margin-top: 30px;">
            © 2026 Ticket Booking System. All rights reserved.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Confirmation email sent to ${booking.email}`);
  } catch (error) {
    console.error("❌ Email sending error:", error);
    // Don't throw - booking should succeed even if email fails
  }
};

// Send payment confirmation email
const sendPaymentConfirmationEmail = async (booking, event) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: booking.email,
      subject: `Payment Confirmed - ${event.name} 🎉`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #28a745; text-align: center;">✅ Payment Confirmed!</h2>
          
          <div style="background-color: #e8f5e9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Dear ${booking.userName},</strong></p>
            <p style="margin: 10px 0;">Thank you! Your payment has been successfully received. Your booking is now fully confirmed!</p>
          </div>

          <h3 style="color: #444; border-bottom: 2px solid #28a745; padding-bottom: 10px;">Payment Details</h3>
          <table style="width: 100%; margin: 15px 0; border-collapse: collapse;">
            <tr style="background-color: #f0f0f0;">
              <td style="padding: 10px; font-weight: bold;">Booking ID:</td>
              <td style="padding: 10px;">${booking.id}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Amount Paid:</td>
              <td style="padding: 10px; color: #28a745; font-weight: bold;">₹${booking.totalAmount}</td>
            </tr>
            <tr style="background-color: #f0f0f0;">
              <td style="padding: 10px; font-weight: bold;">Payment Status:</td>
              <td style="padding: 10px; color: #28a745; font-weight: bold;">✅ PAID</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Email:</td>
              <td style="padding: 10px;">${booking.email}</td>
            </tr>
            <tr style="background-color: #f0f0f0;">
              <td style="padding: 10px; font-weight: bold;">Tickets:</td>
              <td style="padding: 10px;">${booking.ticketsBooked}</td>
            </tr>
          </table>

          <h3 style="color: #444; border-bottom: 2px solid #007bff; padding-bottom: 10px;">Event Information</h3>
          <table style="width: 100%; margin: 15px 0; border-collapse: collapse;">
            <tr style="background-color: #f0f0f0;">
              <td style="padding: 10px; font-weight: bold;">Event:</td>
              <td style="padding: 10px;">${event.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Venue:</td>
              <td style="padding: 10px;">${event.venue}</td>
            </tr>
            <tr style="background-color: #f0f0f0;">
              <td style="padding: 10px; font-weight: bold;">Date:</td>
              <td style="padding: 10px;">${new Date(event.startDate).toLocaleDateString('en-IN')}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Time:</td>
              <td style="padding: 10px;">${new Date(event.startDate).toLocaleTimeString('en-IN')}</td>
            </tr>
          </table>

          <div style="background-color: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 10px 0; color: #333;"><strong>What's Next:</strong></p>
            <ul style="margin: 10px 0; color: #333;">
              <li>Your tickets are now reserved and confirmed</li>
              <li>Check your dashboard for your booking details</li>
              <li>Save this email for reference at the event</li>
              <li>Arrive 15 minutes before the event starts</li>
            </ul>
          </div>

          <p style="text-align: center; color: #999; font-size: 12px; margin-top: 30px;">
            © 2026 Ticket Booking System. All rights reserved.
          </p>
        </div>`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Payment confirmation email sent to ${booking.email}`);
  } catch (error) {
    console.error("❌ Payment email sending error:", error);
    // Don't throw - payment should succeed even if email fails
  }
};

module.exports = { sendTicketConfirmation, sendPaymentConfirmationEmail };
