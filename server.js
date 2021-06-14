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

app.get("/api/workouts/range", async (req, res) => {
  let results = await db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ]);
  console.log("results", results);

  // console.log(results[0].exercises[0])
  if (results.length > 7) {
    res.json(results.slice(results.length - 7, results.length));
  } else {
    res.json(results);
  }
});

app.post("/api/workouts", async (req, res) => {
  let workout = {
    day: new Date(),
    exercises: [],
  };
  let createdWorkout = await db.Workout.create(workout);
  res.json(createdWorkout);
});

app.put("/api/workouts/:id", async (req, res) => {
  let updatedWorkout = await db.Workout.update(
    { _id: req.params.id },
    {
      $push: { exercises: req.body },
    }
  );
  res.json(updatedWorkout);
});

const PORT = process.env.PORT || 3000;



mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});
// app.listen(3000);

app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
