"use stict";

const Workout = require("../models/workouts.js");
const { validateObjectId } = require("../utils/validation");

exports.postWorkout = async (req, res) => {
  try {
    const data = req.body;
    if (!data) {
      return res.status(400).send({
        res: { data: "Invalid Form Fields!", statusCode: 400 },
        error: true,
      });
    }
    const workout = await Workout.create(data);
    return res
      .status(201)
      .send({ res: { data: workout, statusCode: 201 }, error: false });
  } catch (e) {
    return res.status(500).send({
      res: { data: "Internal Server Error!", statusCode: 500 },
      error: true,
    });
  }
};

exports.updateWorkout = async (req, res) => {
  try {
    const data = req.body;
    if (!data) {
      return res.status(400).send({
        res: { data: "Invalid Form Fields!", statusCode: 400 },
        error: true,
      });
    }

    //validate the format of the dietId parameter in the request Url
    if (!validateObjectId(req.params.workoutId)) {
      return res.status(400).send({
        res: { data: "Workout Id not found!", statusCode: 400 },
        error: true,
      });
    }

    let workout = await Workout.findById(req.params.workoutId);

    if (!workout) {
      return res
        .status(400)
        .json({ status: false, msg: "workout with given id not found" });
    }

    //not sure if necessary
    if (workout.user != req.user.id) {
      return res.status(403).send({
        res: { data: "Can't update for another user!", statusCode: 400 },
        error: true,
      });
    }

    workout = await Workout.findByIdAndUpdate(req.params.workoutId, data, {
      new: true,
    });
    return res
      .status(201)
      .send({ res: { data: workout, statusCode: 201 }, error: false });
  } catch (e) {
    return res.status(500).send({
      res: { data: "Internal Server Error!", statusCode: 500 },
      error: true,
    });
  }
};
