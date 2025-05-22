const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
      select: false,
    },
    birthdate: {
      type: Date,
      required: [true, "Please provide your birthdate"],
    },
    zodiacSign: {
      type: String,
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
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const birthdate = new Date(this.birthdate);
  const month = birthdate.getMonth() + 1;
  const day = birthdate.getDate();

  let zodiacSign = "";
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19))
    zodiacSign = "Aries";
  else if ((month === 4 && day >= 20) || (month === 5 && day <= 20))
    zodiacSign = "Taurus";
  else if ((month === 5 && day >= 21) || (month === 6 && day <= 20))
    zodiacSign = "Gemini";
  else if ((month === 6 && day >= 21) || (month === 7 && day <= 22))
    zodiacSign = "Cancer";
  else if ((month === 7 && day >= 23) || (month === 8 && day <= 22))
    zodiacSign = "Leo";
  else if ((month === 8 && day >= 23) || (month === 9 && day <= 22))
    zodiacSign = "Virgo";
  else if ((month === 9 && day >= 23) || (month === 10 && day <= 22))
    zodiacSign = "Libra";
  else if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
    zodiacSign = "Scorpio";
  else if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
    zodiacSign = "Sagittarius";
  else if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
    zodiacSign = "Capricorn";
  else if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
    zodiacSign = "Aquarius";
  else zodiacSign = "Pisces";

  this.zodiacSign = zodiacSign;
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
