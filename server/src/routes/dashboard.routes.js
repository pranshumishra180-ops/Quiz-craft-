const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
} = require("../controller/dashboard.controller");

router.get("/", getDashboardStats);

module.exports = router;