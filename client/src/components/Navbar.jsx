import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        🚀 Quiz Craft AI
      </div>

      <div className="nav-links">
        {/* Admin Only Links */}
        {role === "admin" && (
          <>
            <Link to="/dashboard">
              📊 Dashboard
            </Link>

            <Link to="/upload">
              📄 Upload PDF
            </Link>

          </>
        )}

        {/* Common Links */}
        <Link to="/quiz">
          📚 Quizzes
        </Link>

        <Link to="/leaderboard">
          🏆 Leaderboard
        </Link>

        {/* Student Only */}
        {role === "student" && (
          <Link to="/my-results">
            📊 My Results
          </Link>
        )}
        
  {role === "admin" && (
    <Link to="/manage-users">
      👥 Users
    </Link>
  )}


        <span className="welcome">
          👋 {username}
        </span>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;