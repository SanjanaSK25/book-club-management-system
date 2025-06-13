const express = require("express");
const Club = require("../models/Club");
const { authenticateUser } = require("../middleware/auth");
const router = express.Router();

// Add a new club - Requires authentication
router.post("/", authenticateUser, async (req, res) => {
  try {
    const club = await Club.create({
      ...req.body,
      organizerId: req.user.id,
      organizerName: req.user.username, // Optional: to show organizer
      members: [],
    });
    res.status(201).json(club);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error creating club", error: err.message });
  }
});

// Get all clubs - Public
router.get("/", async (req, res) => {
  const clubs = await Club.find();
  res.json(clubs);
});

// Get club by ID - Public
router.get("/:id", async (req, res) => {
  const club = await Club.findById(req.params.id);
  if (!club) return res.status(404).json({ message: "Club not found" });
  res.json(club);
});

// Join a club - Requires authentication
router.post("/:id/join", authenticateUser, async (req, res) => {
  const club = await Club.findById(req.params.id);
  if (!club) return res.status(404).json({ message: "Club not found" });

  if (
    !club.members.includes(req.user.id) &&
    club.members.length < club.capacity
  ) {
    club.members.push(req.user.id);
    await club.save();
    return res.json({ message: "Joined club" });
  }

  res.status(400).json({ message: "Cannot join club" });
});

// Organizer sets current book - Requires authentication
router.put("/:id/book", authenticateUser, async (req, res) => {
  const club = await Club.findById(req.params.id);
  if (!club) return res.status(404).json({ message: "Club not found" });

  if (club.organizerId !== req.user.id)
    return res.status(403).json({ message: "Forbidden: Not the organizer" });

  club.currentBook = req.body.bookTitle;
  await club.save();
  res.json(club);
});

// Submit feedback - Requires authentication
router.post("/:id/feedback", authenticateUser, async (req, res) => {
  const club = await Club.findById(req.params.id);
  if (!club) return res.status(404).json({ message: "Club not found" });

  club.feedbacks.push({
    userId: req.user.id,
    comment: req.body.comment,
    rating: req.body.rating,
  });

  await club.save();
  res.json({ message: "Feedback added" });
});

module.exports = router;
