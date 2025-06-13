const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Basic validation
    if (!username || !password || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      id: newUser._id,
      username: newUser.username,
      role: newUser.role,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error during registration." });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password required." });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      id: user._id,
      username: user.username,
      role: user.role,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login." });
  }
});

module.exports = router;
