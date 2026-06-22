import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Leaderboard.css";
import Navbar from "../components/Navbar";


function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await api.get("/result/leaderboard");
      setLeaders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>

  <Navbar />
    <div className="leaderboard-page">
      <div className="leaderboard-container">

        <h1 className="leaderboard-title">
          🏆 Leaderboard
        </h1>

        <div className="top-three">

  {leaders[1] && (
    <div className="top-card silver-card">
      <h2>🥈</h2>
      <h3>{leaders[1].userId?.username}</h3>
      <p>{leaders[1].score} Points</p>
    </div>
  )}

  {leaders[0] && (
    <div className="top-card gold-card">
      <h2>🥇</h2>
      <h3>{leaders[0].userId?.username}</h3>
      <p>{leaders[0].score} Points</p>
    </div>
  )}

  {leaders[2] && (
    <div className="top-card bronze-card">
      <h2>🥉</h2>
      <h3>{leaders[2].userId?.username}</h3>
      <p>{leaders[2].score} Points</p>
    </div>
  )}

</div>


        <div className="leaderboard-table">

          <div className="table-header">
            <span>Rank</span>
            <span>Username</span>
            <span>Email</span>
            <span>Score</span>
          </div>

          {leaders.map((user, index) => (
            <div
              className={`table-row ${
                index === 0
                  ? "gold"
                  : index === 1
                  ? "silver"
                  : index === 2
                  ? "bronze"
                  : ""
              }`}
              key={user._id}
            >
              <span>
                {index === 0
                  ? "🥇"
                  : index === 1
                  ? "🥈"
                  : index === 2
                  ? "🥉"
                  : index + 1}
              </span>

              <span>
                {user.userId?.username}
              </span>

              <span>
                {user.userId?.email}
              </span>

              <span>{user.score}</span>
            </div>
          ))}

        </div>
      </div>
    </div>
    </>
  );
}

export default Leaderboard;