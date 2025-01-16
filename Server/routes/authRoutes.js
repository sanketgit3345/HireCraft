import express from "express";
import { rateLimit } from "express-rate-limit";
import { auth } from "../middleware/auth.js";
const router = express.Router();

// Routes for Login, Signup, Sendtoken, Authentication

import {
  signIn,
  register,
  sendVerificationToken,
  changePassword,
} from "../controllers/authController.js";

// ip rate limit

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, //Limit each IP to 100 request per 'window'
  standardHeaders: true, // Return rate limit info in the "RateLimit-*" headers
  legacyHeaders: false, //Disable the "x-rateLimit-*" headers
});

// Register routes
router.post("/register", register);
router.post("/login", signIn);
router.post("/sendtoken", sendVerificationToken);
router.post("/changepassword", auth, changePassword);

export default router;
