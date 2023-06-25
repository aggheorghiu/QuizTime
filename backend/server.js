require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const userRoute =  require("./routes/user.route");
const authRoute = require("./routes/auth.route");
const quizRoute = require("./routes/quiz.route");
const quizSolutionRoute = require("./routes/quizSolution.route")
const verifyAnswersRoute = require("./routes/verify.route")
const scoresRoute = require("./routes/scores.route")

const cors = require('cors');


const app = express();
const port = 8020;


app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/quiz", quizRoute)
app.use("/api/quizSolution", quizSolutionRoute)
app.use("/api/verify", verifyAnswersRoute)
app.use("/api/scores", scoresRoute)

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  }
};


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(port, () => {
  connect();
  console.log(`Backend server is running! on port ${port}`);
});