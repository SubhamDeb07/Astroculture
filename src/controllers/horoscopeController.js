const Horoscope = require("../models/Horoscope");

// Mock horoscope data
const mockHoroscopes = {
  Aries: "Today brings exciting opportunities for leadership and initiative.",
  Taurus: "Focus on stability and financial matters today.",
  Gemini: "Communication flows smoothly, making it a great day for networking.",
  Cancer: "Emotional insights and family matters take center stage.",
  Leo: "Your creative energy is at its peak today.",
  Virgo: "Pay attention to details and organization.",
  Libra: "Balance and harmony are your keywords for today.",
  Scorpio: "Deep insights and transformations are possible.",
  Sagittarius: "Adventure and learning opportunities await.",
  Capricorn: "Career and long-term goals are highlighted.",
  Aquarius: "Innovation and humanitarian efforts are favored.",
  Pisces: "Intuition and spiritual matters are emphasized.",
};

// @desc    Get today's horoscope
// @route   GET /api/horoscope/today
// @access  Private
exports.getTodayHoroscope = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let horoscope = await Horoscope.findOne({
      zodiacSign: req.user.zodiacSign,
      date: today,
    });

    if (!horoscope) {
      horoscope = await Horoscope.create({
        zodiacSign: req.user.zodiacSign,
        date: today,
        content: mockHoroscopes[req.user.zodiacSign],
      });
    }

    res.status(200).json({
      success: true,
      data: horoscope,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get horoscope history
// @route   GET /api/horoscope/history
// @access  Private
exports.getHoroscopeHistory = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const horoscopes = await Horoscope.find({
      zodiacSign: req.user.zodiacSign,
      date: { $gte: sevenDaysAgo },
    }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: horoscopes.length,
      data: horoscopes,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
