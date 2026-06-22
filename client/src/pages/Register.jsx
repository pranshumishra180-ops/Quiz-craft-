
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/Register.css";

function Register() {
  const role = "student";

  const [formData, setFormData] = useState({
    username: "",
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
        "/auth/register",
        {
          ...formData,
          role,
        }
      );

      alert(res.data.message);

      setFormData({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Register Failed"
      );
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1>🎓 Student Registration</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button
            className="register-btn"
            type="submit"
          >
            Register
          </button>
        </form>

        <p className="login-text">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;