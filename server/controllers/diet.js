"use stict";

const Diet = require("../models/diet.js");
const { validateObjectId } = require("../utils/validation");

exports.postDiet = async (req, res) => {
  try {
    const data = req.body;
    if (!data) {
      return res.status(400).send({
        res: { data: "Invalid Form Fields!", statusCode: 400 },
        error: true,
      });
    }
    const diet = await Diet.create(data);
    return res
      .status(201)
      .send({ res: { data: diet, statusCode: 201 }, error: false });
  } catch (e) {
    return res.status(500).send({
      res: { data: "Internal Server Error!", statusCode: 500 },
      error: true,
    });
  }
};

exports.updateDiet = async (req, res) => {
  try {
    const { data } = req.body;
    if (!data) {
      return res.status(400).send({
        res: { data: "Invalid Form Fields!", statusCode: 400 },
        error: true,
      });
    }

    // validate the format of the dietId parameter in the request Url
    if (!validateObjectId(req.params.dietId)) {
      console.log(req.params.dietId);
      return res.status(400).send({
        res: { data: "Diet Id not found!", statusCode: 400 },
        error: true,
      });
    }

    let diet = await Diet.findById(req.params.dietId);

    if (!diet) {
      return res
        .status(400)
        .json({ status: false, msg: "diet with given id not found" });
    }

    //not sure if necessary
    // if (diet.user != req.user.id) {
    //   return res.status(403).send({
    //     res: { data: "Can't update for another user!", statusCode: 400 },
    //     error: true,
    //   });
    // }

    diet = await Diet.findByIdAndUpdate(req.params.dietId, data, { new: true });
    console.log(req.params.dietId);
    return res
      .status(201)
      .send({ res: { data: diet, statusCode: 201 }, error: false });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      res: { data: "Internal Server Error!", statusCode: 500 },
      error: true,
    });
  }
};
