"use stict";

const Water = require("../models/water.js");
const { validateObjectId } = require("../utils/validation");

exports.postWater = async (req, res) => {
  try {
    const userId = req.user._id;
    const waterData = {
      ...req.body,
      user: userId,
    };

    const water = await Water.create(waterData);
    return res.status(201).json({
      res: { data: water, statusCode: 201 },
      error: false,
    });
  } catch (e) {
    return res.status(500).send({
      res: { data: "Internal Server Error!", statusCode: 500 },
      error: true,
    });
  }
};

exports.updateWater = async (req, res) => {
  try {
    const data = req.body;
    if (!data) {
      return res.status(400).send({
        res: { data: "Invalid Form Fields!", statusCode: 400 },
        error: true,
      });
    }

    //validate the format of the dietId parameter in the request Url
    if (!validateObjectId(req.params.waterId)) {
      return res.status(400).send({
        res: { data: "Water Id not found!", statusCode: 400 },
        error: true,
      });
    }

    let water = await Water.findById(req.params.waterId);

    if (!water) {
      return res
        .status(400)
        .json({ status: false, msg: "water with given id not found" });
    }

    //not sure if necessary
    if (water.user != req.user.id) {
      return res.status(403).send({
        res: { data: "Can't update for another user!", statusCode: 400 },
        error: true,
      });
    }

    water = await Water.findByIdAndUpdate(req.params.waterId, data, {
      new: true,
    });
    return res
      .status(201)
      .send({ res: { data: water, statusCode: 201 }, error: false });
  } catch (e) {
    return res.status(500).send({
      res: { data: "Internal Server Error!", statusCode: 500 },
      error: true,
    });
  }
};
