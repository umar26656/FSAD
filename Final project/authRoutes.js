const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET /api/events - Fetch all events
const getEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: { startDate: "asc" },
    });
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// GET /api/events/:id - Fetch single event by ID
const getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) },
    });
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Seed multiple events if none exist
const seedEvent = async () => {
  try {
    const count = await prisma.event.count();
    if (count === 0) {
      const events = [
        {
          name: "TechFest 2026",
          department: "Computer Science and Engineering",
          startDate: new Date("2026-05-10T09:00:00.000Z"),
          endDate: new Date("2026-05-10T17:00:00.000Z"),
          venue: "Main Auditorium, Block A",
          ticketPrice: 149.0,
          totalTickets: 300,
          availableTickets: 300,
          description: "Annual technology festival with coding competitions, hackathons, workshops on AI/ML, and industry expert talks. Open to all departments.",
          imageEmoji: "💻",
          category: "Technology",
        },
        {
          name: "CodeStorm Hackathon",
          department: "Computer Science and Engineering",
          startDate: new Date("2026-05-15T08:00:00.000Z"),
          endDate: new Date("2026-05-16T20:00:00.000Z"),
          venue: "Computer Lab Complex, Block C",
          ticketPrice: 99.0,
          totalTickets: 150,
          availableTickets: 150,
          description: "24-hour hackathon challenge where teams compete to build innovative solutions. Exciting prizes and internship opportunities await winners.",
          imageEmoji: "⚡",
          category: "Hackathon",
        },
        {
          name: "CSE Department Annual Day",
          department: "Computer Science and Engineering",
          startDate: new Date("2026-06-01T10:00:00.000Z"),
          endDate: new Date("2026-06-01T18:00:00.000Z"),
          venue: "College Grounds & Amphitheatre",
          ticketPrice: 200.0,
          totalTickets: 500,
          availableTickets: 500,
          description: "Grand annual celebration of the CSE department featuring cultural programs, award ceremonies, alumni meetup, and an evening of entertainment.",
          imageEmoji: "🎭",
          category: "Cultural",
        },
        {
          name: "AI & ML Summit",
          department: "Computer Science and Engineering",
          startDate: new Date("2026-05-22T09:30:00.000Z"),
          endDate: new Date("2026-05-22T16:30:00.000Z"),
          venue: "Seminar Hall 1, Block B",
          ticketPrice: 299.0,
          totalTickets: 120,
          availableTickets: 120,
          description: "Deep dive into Artificial Intelligence and Machine Learning with hands-on sessions, research paper presentations, and a live AI demo showcase.",
          imageEmoji: "🤖",
          category: "Workshop",
        },
        {
          name: "Web Dev Bootcamp",
          department: "Computer Science and Engineering",
          startDate: new Date("2026-05-28T10:00:00.000Z"),
          endDate: new Date("2026-05-30T16:00:00.000Z"),
          venue: "Lab 201, Block C",
          ticketPrice: 349.0,
          totalTickets: 60,
          availableTickets: 60,
          description: "3-day intensive bootcamp covering React, Node.js, and cloud deployment. Participants will build a full-stack project and receive a certificate of completion.",
          imageEmoji: "🌐",
          category: "Workshop",
        },
        {
          name: "E-Sports Championship",
          department: "Computer Science and Engineering",
          startDate: new Date("2026-06-08T12:00:00.000Z"),
          endDate: new Date("2026-06-08T21:00:00.000Z"),
          venue: "Gaming Arena, Student Center",
          ticketPrice: 79.0,
          totalTickets: 200,
          availableTickets: 200,
          description: "Compete in BGMI, Valorant, and Chess tournaments. Spectator passes available. Massive prize pool and gaming gear giveaways throughout the event.",
          imageEmoji: "🎮",
          category: "Sports",
        },
      ];

      await prisma.event.createMany({ data: events });
      console.log(`✅ ${events.length} events seeded successfully.`);
    }
  } catch (error) {
    console.error("❌ Seeding error:", error);
  }
};

module.exports = { getEvents, getEventById, seedEvent };
