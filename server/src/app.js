const express = require("express")
const cookieParser = require("cookie-parser");



const app = express();


const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://quiz-craft-3r1v.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());


const authRoutes = require("./routes/auth.routes")
const quizRoutes = require("./routes/quiz.routes");
const resultRoutes = require("./routes/result.routes");
const aiRoutes =require("./routes/ai.routes");
const dashboardRoutes =require("./routes/dashboard.routes");
const userRoutes = require("./routes/user.routes");



app.use("/api/auth",authRoutes)
app.use("/api/quiz",quizRoutes);
app.use("/api/result",resultRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/dashboard",dashboardRoutes);
app.use("/api/users", userRoutes);

module.exports = app