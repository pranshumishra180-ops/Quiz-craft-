const mongoose =  require("mongoose")
const Quiz = require("../models/quiz.model");



const createQuiz = async function(req,res){

    try{
        const quiz = await Quiz.create(req.body);

        return res.status(201).json({
            message:"Quiz Created successfully ",
            quiz
        })
    }
    catch(error){
        return res.status(500).json({
            message:error.message
        });
    }
}

const getAllQuiz = async(req,res)=>{
    try{

        const quizzes = await Quiz.find();

        return res.status(200).json(quizzes);

    }catch(error){
        return res.status(500).json({
            message:error.message
        });
    }
}

const getQuizById = async(req,res)=>{
    try{

        const quiz = await Quiz.findById(req.params.id);

        if(!quiz){
            return res.status(404).json({
                message:"Quiz Not Found"
            });
        }

        return res.status(200).json(quiz);

    }catch(error){
        return res.status(500).json({
            message:error.message
        });
    }
}

const deleteQuiz = async(req,res)=>{
    try{

        await Quiz.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            message:"Quiz Deleted Successfully"
        });

    }catch(error){
        return res.status(500).json({
            message:error.message
        });
    }
}

module.exports = {
    createQuiz,
    getAllQuiz,
    getQuizById,
    deleteQuiz
}