const mongoose = require("mongoose");
const express = require("express");
const logger = require("morgan");

// require('dotenv').config()

const PORT = process.env.PORT || 8080;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//change mongodb://localhost/"" to my database
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/workout",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// // routes
app.use(require("./routes/api.js"));
// app.use(require("./routes/view.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
