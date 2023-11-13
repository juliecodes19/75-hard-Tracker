"use strict";

// const Recap = require("../models/recap");
const Workout = require("../models/workouts");
const Diet = require("../models/diet");
const Image = require("../models/progress-pic");
const Water = require("../models/water");
const Reading = require("../models/reading");

exports.getRecap = async (req, res) => {
  const userId = req.user._id;
  console.log(userId);
  const { startDate, endDate } = req.query; // Use query parameters to get the date

  console.log(startDate);

  if (!startDate) {
    return res
      .status(400)
      .json({ error: "startDate query parameter is required" });
  }

  // Convert startDate and endDate to Date objects
  const start = new Date(startDate);
  let end = endDate ? new Date(endDate) : new Date(start);

  // If only startDate is given, set end to the end of the startDate
  if (!endDate) {
    end.setHours(23, 59, 59, 999); // Set to the end of the day
  }

  // Validate the dates to ensure they are valid
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return res.status(400).json({ error: "Invalid dates provided" });
  }

  if (end < start) {
    return res.status(400).json({ error: "endDate must be after startDate" });
  }

  try {
    // Find workouts, diets, images, water intakes, and readings within the date range
    const workouts = await Workout.find({
      user: userId,
      date: { $gte: start, $lte: end },
    });

    const diets = await Diet.find({
      user: userId,
      date: { $gte: start, $lte: end },
    });
    const images = await Image.find({
      user: userId,
      date: { $gte: start, $lte: end },
    });
    const waterIntakes = await Water.find({
      user: userId,
      date: { $gte: start, $lte: end },
    });
    const readings = await Reading.find({
      user: userId,
      date: { $gte: start, $lte: end },
    });

    // Compile the recap data
    const recapData = {
      workouts,
      diets,
      images,
      waterIntakes,
      readings,
    };

    res.json(recapData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
