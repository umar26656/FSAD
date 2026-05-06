const express = require("express");
const router = express.Router();
const { getQRCode, uploadQRCode } = require("../controllers/paymentController");

// GET /api/payment/qr - Fetch QR code
router.get("/qr", getQRCode);

// POST /api/payment/qr/upload - Upload QR code (admin only)
router.post("/qr/upload", uploadQRCode);

module.exports = router;
