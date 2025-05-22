const express = require("express");
const router = express.Router();
const {
  getTodayHoroscope,
  getHoroscopeHistory,
} = require("../controllers/horoscopeController");
const protect = require("../middleware/auth");
const limiter = require("../middleware/rateLimiter");

router.use(protect);
router.use(limiter);

router.get("/today", getTodayHoroscope);
router.get("/history", getHoroscopeHistory);

module.exports = router;
