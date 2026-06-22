const mongoose  = require("mongoose")
const { options } = require("../app")

const quizSchema = new mongoose.Schema({
    title:String,
    category:String,
    questions:[
        {
            question:String,
            options:[String],
            correctAnswer:String

        }
    ]
},{timestamps:true});
 module.exports = mongoose.model("Quiz",quizSchema);