const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 5, 
  message: "Too many requests from this IP, please try again after a minute",
});

module.exports = limiter;
