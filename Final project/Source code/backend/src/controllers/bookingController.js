const { PrismaClient } = require("@prisma/client");
const { sendTicketConfirmation, sendPaymentConfirmationEmail } = require("../services/emailService");
const prisma = new PrismaClient();

// Email validation helper
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// POST /api/bookings - Create a new booking
const createBooking = async (req, res) => {
  const { userName, email, department, phone, ticketsBooked, eventId, userId } = req.body;

  // --- Validation ---
  if (!userName || !email || !department || !phone || !ticketsBooked || !eventId) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, message: "Enter a valid email address." });
  }

  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ success: false, message: "Enter a valid 10-digit Indian mobile number." });
  }

  const tickets = parseInt(ticketsBooked);
  if (isNaN(tickets) || tickets <= 0) {
    return res.status(400).json({ success: false, message: "Number of tickets must be a positive number." });
  }

  try {
    const event = await prisma.event.findUnique({ where: { id: parseInt(eventId) } });

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found." });
    }

    if (tickets > event.availableTickets) {
      return res.status(400).json({
        success: false,
        message: `Only ${event.availableTickets} tickets are available. Please reduce your count.`,
      });
    }

    const totalAmount = tickets * event.ticketPrice;

    const [booking] = await prisma.$transaction([
      prisma.booking.create({
        data: {
          userName,
          email,
          department,
          phone,
          ticketsBooked: tickets,
          totalAmount,
          eventId: event.id,
          userId: userId ? parseInt(userId) : null,
          paymentStatus: "pending",
        },
      }),
      prisma.event.update({
        where: { id: event.id },
        data: { availableTickets: event.availableTickets - tickets },
      }),
    ]);

    // Send ticket confirmation email
    await sendTicketConfirmation(booking, event);

    res.status(201).json({
      success: true,
      message: "Booking confirmed! Confirmation email sent.",
      data: {
        bookingId: booking.id,
        userName: booking.userName,
        email: booking.email,
        phone: booking.phone,
        department: booking.department,
        eventName: event.name,
        ticketsBooked: booking.ticketsBooked,
        totalAmount: booking.totalAmount,
        venue: event.venue,
        startDate: event.startDate,
        endDate: event.endDate,
        paymentStatus: booking.paymentStatus,
      },
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// PATCH /api/bookings/:id/pay - Mark booking as paid
const completePayment = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await prisma.booking.update({
      where: { id: parseInt(id) },
      data: { paymentStatus: "paid" },
    });

    // Fetch event details to send payment confirmation email
    const event = await prisma.event.findUnique({ where: { id: booking.eventId } });

    // Send payment confirmation email
    if (event) {
      await sendPaymentConfirmationEmail(booking, event);
    }

    res.status(200).json({ success: true, message: "Payment successful!", data: booking });
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// GET /api/bookings - Fetch all bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: { event: true },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

module.exports = { createBooking, getBookings, completePayment };
