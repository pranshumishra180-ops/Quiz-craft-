const Quiz = require("../models/quiz.model");
const User = require("../models/user.model");
const Result = require("../models/result.model");

const getDashboardStats = async (req, res) => {
  try {
    const totalQuizzes = await Quiz.countDocuments();

    const totalUsers = await User.countDocuments();

    const totalResults = await Result.countDocuments();

    const pdfQuizzes =
      await Quiz.countDocuments({
        category: "PDF Generated",
      });

    res.status(200).json({
      totalQuizzes,
      totalUsers,
      totalResults,
      pdfQuizzes,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};