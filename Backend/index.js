const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 4000;
const authRoute = require("./routes/authRoute");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

//middlewares

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASS}@cluster0.5gxx08s.mongodb.net/`
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  });
app.use(authRoute);
app.use(notFound);
app.use(errorHandler);
