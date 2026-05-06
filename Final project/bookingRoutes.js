const fs = require("fs");
const path = require("path");

const QR_DIR = path.join(__dirname, "../../public/qr");

// Ensure QR directory exists
if (!fs.existsSync(QR_DIR)) {
  fs.mkdirSync(QR_DIR, { recursive: true });
}

// GET /api/payment/qr - Fetch QR code
const getQRCode = async (req, res) => {
  try {
    const qrPath = path.join(QR_DIR, "payment-qr.jpg");
    
    // Check if QR code exists
    if (!fs.existsSync(qrPath)) {
      return res.status(404).json({ 
        success: false, 
        message: "QR code not configured. Contact admin." 
      });
    }

    // Read and return QR code as base64
    const qrData = fs.readFileSync(qrPath);
    const base64QR = Buffer.from(qrData).toString("base64");

    res.status(200).json({
      success: true,
      data: {
        qrCode: `data:image/jpeg;base64,${base64QR}`,
        upiId: process.env.UPI_ID || "admin@upi",
        businessName: "Campus Tix",
      },
    });
  } catch (error) {
    console.error("QR fetch error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// POST /api/payment/qr/upload - Upload QR code
const uploadQRCode = async (req, res) => {
  try {
    // Check if file is provided
    if (!req.files || !req.files.qrImage) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const uploadedFile = req.files.qrImage;
    const fileName = "payment-qr.jpg";
    const uploadPath = path.join(QR_DIR, fileName);

    // Save file
    await uploadedFile.mv(uploadPath);

    res.status(200).json({
      success: true,
      message: "QR code uploaded successfully!",
      data: { fileName },
    });
  } catch (error) {
    console.error("QR upload error:", error);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
};

module.exports = { getQRCode, uploadQRCode };
