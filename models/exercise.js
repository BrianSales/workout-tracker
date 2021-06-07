const mongoose = require ("mongoose")
const exercise = new mongoose.Schema({
    type: String,
    name: String,
    duration: Number,
    weight: Number,
    reps: Number,
    sets: Number,
    distance: Number,
}, { typeKey: '$type' })

module.exports = exercise