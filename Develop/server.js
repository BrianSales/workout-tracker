
const express = require ('express')
const mongoose = require ('mongoose')
const app = express ()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = require ('./models')


app.use(express.static(
    "public"
))


app.get("/api/workouts", async (req, res)=>{
    let results = await db.Workout.find()
    res.json(results)


})

// app.get("/", (req,res)=>{

// })
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/userdb", { useNewUrlParser: true });
app.listen(3000)