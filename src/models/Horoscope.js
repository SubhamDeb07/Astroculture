const mongoose = require("mongoose");

const horoscopeSchema = new mongoose.Schema(
  {
    zodiacSign: {
      type: String,
      required: true,
      enum: [
        "Aries",
        "Taurus",
        "Gemini",
        "Cancer",
        "Leo",
        "Virgo",
        "Libra",
        "Scorpio",
        "Sagittarius",
        "Capricorn",
        "Aquarius",
        "Pisces",
      ],
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

horoscopeSchema.index({ zodiacSign: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Horoscope", horoscopeSchema);
