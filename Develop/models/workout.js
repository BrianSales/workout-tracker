const exercise = require ('./exercise')

const mongoose = require("mongoose")

const workout = new mongoose.Schema({
    day: Date,
    exercises: [{
        type: String,
        name: String,
        duration: Number,
        weight: Number,
        reps: Number,
        sets: Number,
        distance: Number,
    }]
})

let model = mongoose.model("workouts", workout)

model.aggregate([
    {
        $addFields: {
            totalDuration: {$sum: "$exercises.$duration"}
        }
    }
])

module.exports = model