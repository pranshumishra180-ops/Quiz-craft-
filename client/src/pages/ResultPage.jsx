import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ResultPage.css";
import Navbar from "../components/Navbar";




function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const score = location.state?.score || 0;
  const total = location.state?.total || 0;

  return (
    <>
  <Navbar />
    <div className="result-page">
      <div className="result-card">

        <div className="result-icon">🎉</div>

        <h1>Quiz Completed</h1>

        <div className="score-circle">
          <span>{score}</span>
          <small>Score</small>
        </div>

        <p className="result-text">
          You scored <strong>{score}</strong> out of{" "}
          <strong>{total}</strong>
        </p>

        <div className="result-buttons">

          <button
            onClick={() =>
              navigate("/leaderboard")
            }
          >
            🏆 View Leaderboard
          </button>

          <button
            className="secondary-btn"
            onClick={() =>
              navigate("/quiz")
            }
          >
            🔄 Play Again
          </button>

        </div>

      </div>
    </div>
    </>
  );
}

export default ResultPage;