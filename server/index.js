const express = require("express");
const app = express();
const router = require("./router.js");
const cors = require("cors");
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
// const SERVER_PORT = process.env.SERVER_PORT || 3001;
const dotenv = require("dotenv");

dotenv.config();
const port = 3000;

app.use(cors());

app.use(express.json());
// app.use(router);

// app.use(
//   session({
//     name: "sid",
//     saveUninitialized: false,
//     resave: false,
//     secret: SECRET,
//     cookie: {
//       maxAge: 1000 * 60 * 60,
//       sameSite: true,
//       httpOnly: false,

//       secure: false,
//     },
//   })
// );
app.use(router);

app.listen(3000, console.log(`server is running on port ${port}`));
