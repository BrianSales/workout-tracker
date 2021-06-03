const express = require("express");
const mongoose = require("mongoose");

const path = require("path");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = require("./models");

app.use(express.static("public"));

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});

app.get("/api/workouts", async (req, res) => {
  let results = await db.Workout.find({}).lean();
  console.log("results", results);
  // console.log(results[0].exercises[0])
  res.json(results);
});

// app.get("/", (req,res)=>{

// })
mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.listen(3000);
