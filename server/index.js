const express = require("express");
const app = express();
const router = require("./router.js");
const cors = require("cors");
const AWS = require("aws-sdk");

const dotenv = require("dotenv");

dotenv.config();
const port = 3000;

AWS.config.update({
  accessKeyId: "AKIAXLAF2MSRJWIMAGQG",
  secretAccessKey: "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",
});

const s3 = new AWS.S3({ region: "US East (Ohio) us-east-2" });

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

app.use(express.json());

app.use(router);

app.listen(3000, console.log(`server is running on port ${port}`));
