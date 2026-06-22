import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import "../styles/QuizList.css";
import Navbar from "../components/Navbar";

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const res = await api.get("/quiz");
      setQuizzes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteQuiz = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this quiz?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/quiz/${id}`);

      setQuizzes(
        quizzes.filter(
          (quiz) => quiz._id !== id
        )
      );

      alert("Quiz Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="quiz-container">
        <h1 className="quiz-title">
          🚀 All Quizzes
        </h1>

        <div className="quiz-grid">
          {quizzes.map((quiz) => (
            <div
              className="quiz-card"
              key={quiz._id}
            >
              <h2>{quiz.title}</h2>

              <p>{quiz.category}</p>

              <Link to={`/quiz/${quiz._id}`}>
                <button className="quiz-btn">
                  Start Quiz
                </button>
              </Link>

{localStorage.getItem("role") === "admin" && (
  <button
    className="delete-btn"
    onClick={() => deleteQuiz(quiz._id)}
  >
    🗑 Delete
  </button>
)}
             
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default QuizList;