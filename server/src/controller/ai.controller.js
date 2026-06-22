const fs = require("fs");
const pdfParse = require("pdf-parse");
const Quiz = require("../models/quiz.model");



const uploadPdf = async (req, res) => {
  try {
    const dataBuffer = fs.readFileSync(req.file.path);

    const pdfData = await pdfParse(dataBuffer);

    const text = pdfData.text;
const lines = text
  .split("\n")
  .filter(line => line.trim().length > 20)
  .slice(0, 5);

console.log(lines);
  
const mcqs = lines.map((line, index) => {

  const words = line
    .split(" ")
    .filter(word => word.length > 4);

  const answer =
    words[0] || "Programming";

  return {
    question: `What is related to: ${line.substring(0, 40)} ?`,
    options: [
      answer,
      "Database",
      "Browser",
      "Operating System"
    ],
    correctAnswer: answer
  };
});
  


const quiz = await Quiz.create({
  title: req.file.originalname.replace(".pdf", ""),
  category: "PDF Generated",
  questions: mcqs,
});

 return res.status(200).json({
  success: true,
  message: "Quiz Generated Successfully",
  quiz,
});
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  uploadPdf,
};