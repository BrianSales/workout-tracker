const exercise = require("./exercise");

const mongoose = require("mongoose");

const workout = new mongoose.Schema({
  day: Date,
  exercises: [exercise],
});

let model = mongoose.model("workouts", workout);

model.aggregate([
  {
    $addFields: {
      totalDuration: { $sum: "$exercises.$duration" },
    },
  },
]);

module.exports = model;
