import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/QuizPage.css";

function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60);


  useEffect(() => {
    fetchQuiz();
  }, []);


    useEffect(() => {
  if (!quiz) return;

  if (timeLeft === 0) {
    handleSubmit();
    return;
  }

  const timer = setTimeout(() => {
    setTimeLeft(timeLeft - 1);
  }, 1000);

  return () => clearTimeout(timer);

}, [timeLeft, quiz]);


  const fetchQuiz = async () => {
    try {
      const res = await api.get(`/quiz/${id}`);
      setQuiz(res.data);
    } catch (error) {
      console.log(error);
    }
  };



    const handleOptionChange = (
  questionIndex,
  option
) => {
  setAnswers((prev) => {

    const updated = { ...prev };

    if (
      updated[questionIndex] === option
    ) {
      delete updated[questionIndex];
    } else {
      updated[questionIndex] = option;
    }

    return updated;
  });
};

 
  const handleSubmit = async () => {
    let score = 0;

    if(timeLeft === 0){
  alert("⏰ Time Over! Quiz Submitted Automatically");
}

    quiz.questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        score++;
      }
    });

    const userId = localStorage.getItem("userId");

    try {
      await api.post("/result/submit", {
        userId,
        quizId: quiz._id,
        score,
      });

      navigate("/result", {
        state: {
          score,
          total: quiz.questions.length,
        },
      });

    } catch (error) {
      console.log(error);
    }
  };

  if (!quiz) return <h2>Loading...</h2>;

  return (

        

    <div className="quiz-page">
      <div className="quiz-box">

        <h1 className="quiz-title">
          🚀 {quiz.title}
        </h1>

    <div className="timer-box">
  ⏱️ Time Left: {timeLeft}s
</div>

<div className="progress-container">
  <div
    className="progress-fill"
    style={{
      width: `${
        (Object.keys(answers).length /
          quiz.questions.length) *
        100
      }%`,
    }}
  ></div>
</div>

<p className="progress-text">
  {Object.keys(answers).length} / {quiz.questions.length}
  Questions Answered
</p>

        {quiz.questions.map((q, index) => (
          <div
            className="question-card"
            key={index}
          >
            <h3>{q.question}</h3>

            {q.options.map((option, i) => (
              <label
                key={i}
                className="option-label"
              >
             <label
  key={i}
  className={`option-label ${
    answers[index] === option
      ? "selected-option"
      : ""
  }`}
  onClick={() =>
    handleOptionChange(
      index,
      option
    )
  }
></label>  
                    

                <span>{option}</span>
              </label>
            ))}
          </div>
        ))}

        <button
          className="submit-btn"
          onClick={handleSubmit}
        >
          Submit Quiz 🚀
        </button>

      </div>
    </div>
  );
}

export default QuizPage;