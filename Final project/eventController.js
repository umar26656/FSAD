const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

// POST /api/auth/register
const register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Registration attempt:", { name, email, passwordLength: password?.length });

  if (!name || !email || !password) {
    console.log("Missing fields - name:", !!name, "email:", !!email, "password:", !!password);
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.log("Invalid email format:", email);
    return res.status(400).json({ success: false, message: "Enter a valid email address." });
  }

  if (password.length < 6) {
    console.log("Password too short");
    return res.status(400).json({ success: false, message: "Password must be at least 6 characters." });
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      console.log("Email already exists:", email);
      return res.status(409).json({ success: false, message: "An account with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    console.log("Registration successful:", user.email);
    res.status(201).json({
      success: true,
      message: "Account created successfully!",
      data: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error: " + error.message });
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email);

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required." });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.log("User not found:", email);
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch for user:", email);
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    console.log("Login successful:", email);
    res.status(200).json({
      success: true,
      message: "Login successful!",
      data: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

module.exports = { register, login };
