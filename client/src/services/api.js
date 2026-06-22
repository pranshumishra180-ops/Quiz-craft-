import axios from "axios";

const api = axios.create({
  baseURL: "https://quiz-craft-backend-g539.onrender.com/api",
  withCredentials: true,
});

export default api;