import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalQuizzes: 0,
    totalUsers: 0,
    totalResults: 0,
    pdfQuizzes: 0,
  });

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      navigate("/quiz");
      return;
    }

    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/dashboard");

      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard">
      <h1>📊 Admin Dashboard</h1>

      <div className="stats-grid">

        <div className="stat-card">
          <h2>📚</h2>
          <h3>Total Quizzes</h3>
          <p>{stats.totalQuizzes}</p>
        </div>

        <div className="stat-card">
          <h2>👥</h2>
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>

        <div className="stat-card">
          <h2>🏆</h2>
          <h3>Total Results</h3>
          <p>{stats.totalResults}</p>
        </div>

        <div className="stat-card">
          <h2>📄</h2>
          <h3>PDF Quizzes</h3>
          <p>{stats.pdfQuizzes}</p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;