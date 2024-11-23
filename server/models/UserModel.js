const mongoose = require("mongoose");
const bcrypt=require("bcrypt")
const userShema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
    },
    OtpcreatedAt: {
      type: Date,
    },

    Isverified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "User",
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userShema);

userShema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userShema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = User;
