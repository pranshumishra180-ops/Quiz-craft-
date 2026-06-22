const Result = require("../models/result.model");

const submitResult = async(req,res)=>{
    try{

        const result = await Result.create(req.body);

        return res.status(201).json({
            message:"Result Submitted Successfully",
            result
        });

    }catch(error){
        return res.status(500).json({
            message:error.message
        });
    }
};

const getLeaderboard = async(req,res)=>{
    try{

        const leaderboard = await Result.find()
        .sort({score:-1})
        .populate("userId","username email")
        .limit(10);

        return res.status(200).json(leaderboard);

    }catch(error){
        return res.status(500).json({
            message:error.message
        });
    }
};

const getMyResults = async (req, res) => {
  try {
    const results = await Result.find({
      userId: req.user.id,
    })
      .populate("quizId", "title")
      .sort({ createdAt: -1 });

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
    submitResult,
    getLeaderboard,
    getMyResults
};