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

module.exports = mongoose.model('workout', workout)