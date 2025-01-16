import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is Required!"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is Required!"],
    },
    email: {
      type: String,
      required: [true, " Email is Required!"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "Password is Required!"],
      minlength: [6, "Password length should be greater than 5 character"],
      select: true,
    },
    accountType: {
      type: String,
      default: "seeker",
    },
    contact: { type: String },
    location: { type: String },
    profileUrl: { type: String },
    jobTitle: { type: String },
    about: { type: String },
    application: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "applications",
      },
    ],
    appliedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Jobs",
      },
    ],
    vToken: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "token",
    },
    token: {
      type: String,
    },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

//JSON WEBTOKEN
userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const User = mongoose.model("User", userSchema);

export default User;
