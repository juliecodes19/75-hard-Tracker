const Image = require("../models/progress-pic.js");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const s3BucketUrl = "https://75hardbucket.s3.us-east-2.amazonaws.com";
exports.postImage = async (req, res) => {
  try {
    const { name } = req.body;
    const { user } = req;
    const { buffer, mimetype } = req.file;

    const s3 = new AWS.S3({ region: "us-east-2" });

    const filename = `${uuidv4()}.${mimetype.split("/")[1]}`;
    const uploadParams = {
      Bucket: "75hardbucket",
      Key: filename,
      Body: buffer,
      ContentType: mimetype,
    };

    await s3.upload(uploadParams).promise();

    const date = new Date();
    const s3ObjectKey = uploadParams.Key;

    const newImage = new Image({
      user: user._id,
      name,
      img: {
        data: s3ObjectKey, // Store the S3 object key as the image data
        contentType: mimetype,
        url: `${s3BucketUrl}/${s3ObjectKey}`, // Construct the reference URL
      },
      date,
    });

    await newImage.save();
    res.status(201).json({ message: "Image uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getImagebyID = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    const s3 = new AWS.S3({ region: "us-east-2" }); // Specify your AWS region

    const getObjectParams = {
      Bucket: "75hardbucket", // Replace with your S3 bucket name
      Key: image.img.data, // Use the stored S3 object key
    };

    const imageData = await s3.getObject(getObjectParams).promise();

    res.setHeader("Content-Type", image.img.contentType);
    res.send(imageData.Body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
