const express = require("express");
const Club = require("../models/Club");
const router = express.Router();

router.get("/:id/clubs", async (req, res) => {
  const clubs = await Club.find({ members: req.params.id });
  res.json(clubs);
});

module.exports = router;
