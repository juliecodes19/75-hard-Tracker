"use stict";

const Reading = require("../models/reading.js");
const { validateObjectId } = require("../utils/validation");

exports.postReading = async (req, res) => {
  try {
    const userId = req.user._id;
    const readingData = {
      ...req.body,
      user: userId,
    };

    const reading = await Reading.create(readingData);
    return res.status(201).json({
      res: { data: reading, statusCode: 201 },
      error: false,
    });
  } catch (e) {
    return res.status(500).send({
      res: { data: "Internal Server Error!", statusCode: 500 },
      error: true,
    });
  }
};

exports.updateReading = async (req, res) => {
  try {
    const data = req.body;
    if (!data) {
      return res.status(400).send({
        res: { data: "Invalid Form Fields!", statusCode: 400 },
        error: true,
      });
    }

    //validate the format of the dietId parameter in the request Url
    if (!validateObjectId(req.params.readingId)) {
      return res.status(400).send({
        res: { data: "Reading Id not found!", statusCode: 400 },
        error: true,
      });
    }

    let reading = await Reading.findById(req.params.readingId);

    if (!reading) {
      return res
        .status(400)
        .json({ status: false, msg: "reading with given id not found" });
    }

    //not sure if necessary
    if (reading.user != req.user.id) {
      return res.status(403).send({
        res: { data: "Can't update for another user!", statusCode: 400 },
        error: true,
      });
    }

    reading = await Reading.findByIdAndUpdate(req.params.readingId, data, {
      new: true,
    });
    return res
      .status(201)
      .send({ res: { data: reading, statusCode: 201 }, error: false });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      res: { data: "Internal Server Error!", statusCode: 500 },
      error: true,
    });
  }
};
