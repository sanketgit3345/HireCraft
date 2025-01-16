import mongoose, { Schema } from "mongoose";
import validator from "validator";

const companySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Company Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be of atleast six character"],
      select: true,
    },
    accountType: {
      type: String,
      default: "company",
      required: true,
    },
    contact: { type: String },
    location: { type: String },
    about: { type: String },
    profileUrl: { type: String },
    token: { type: String },
    jobPosts: [{ type: Schema.Types.ObjectId, ref: "Jobs" }],
  },
  { timestamps: true }
);

const Companies = mongoose.model("Companies", companySchema);

export default Companies;
