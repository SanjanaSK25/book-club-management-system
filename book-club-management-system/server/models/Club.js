const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  userId: String,
  rating: Number,
  review: String,
});

const ClubSchema = new mongoose.Schema({
  name: String,
  description: String,
  coverImage: String,
  capacity: Number,
  genre: String,
  organizerId: String,
  members: [String],
  currentBook: String,
  feedbacks: [FeedbackSchema],
});

// Prevent OverwriteModelError
module.exports = mongoose.models.Club || mongoose.model("Club", ClubSchema);
