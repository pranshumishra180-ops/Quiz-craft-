import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [loginType, setLoginType] = useState("student");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await api.post(
      "/auth/login",
      {
        ...formData,
        role: loginType,
      },
      {
        withCredentials: true,
      }
    );

    localStorage.setItem(
      "userId",
      res.data.user.id
    );

    localStorage.setItem(
      "username",
      res.data.user.username
    );

    localStorage.setItem(
      "role",
      res.data.user.role
    );

    if (res.data.token) {
      localStorage.setItem(
        "token",
        res.data.token
      );
    }

    alert(res.data.message);

    if (res.data.user.role === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/quiz");
    }
  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Login Failed"
    );
  }
};

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🚀 Quiz Craft AI</h1>

        <div className="login-tabs">
          <button
            type="button"
            className={
              loginType === "student"
                ? "active"
                : ""
            }
            onClick={() =>
              setLoginType("student")
            }
          >
            🎓 Student
          </button>

          <button
            type="button"
            className={
              loginType === "admin"
                ? "active"
                : ""
            }
            onClick={() =>
              setLoginType("admin")
            }
          >
            👨‍💼 Admin
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder={`Enter ${loginType} Email`}
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="login-btn"
          >
            Login as{" "}
            {loginType === "admin"
              ? "Admin"
              : "Student"}
          </button>
        </form>

        <p className="register-text">
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;