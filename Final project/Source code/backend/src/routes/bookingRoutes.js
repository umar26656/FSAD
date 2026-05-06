const express = require("express");
const router = express.Router();
const { createBooking, getBookings, completePayment } = require("../controllers/bookingController");

// POST /api/bookings
router.post("/", createBooking);

// GET /api/bookings
router.get("/", getBookings);

// PATCH /api/bookings/:id/pay
router.patch("/:id/pay", completePayment);

module.exports = router;
