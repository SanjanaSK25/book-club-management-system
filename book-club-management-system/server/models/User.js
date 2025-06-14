const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["member", "organizer"], required: true },
});

// Prevent OverwriteModelError
module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
