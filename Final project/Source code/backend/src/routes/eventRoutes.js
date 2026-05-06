const express = require("express");
const router = express.Router();
const { getEvents, getEventById } = require("../controllers/eventController");

// GET /api/events
router.get("/", getEvents);

// GET /api/events/:id
router.get("/:id", getEventById);

module.exports = router;
