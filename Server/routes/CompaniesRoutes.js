import express from "express";

import { rateLimit } from "express-rate-limit";
import { auth } from "../middleware/auth.js";
import {
  getCompanies,
  getCompanyById,
  getCompanyJobListing,
  getCompanyProfile,
  register,
  signIn,
  updateCompanyProfile,
} from "../controllers/companyController.js";

// ip rate limit

const router = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

// Register

router.post("/register", limiter, register);

// Login
router.post("/login", limiter, signIn);

router.post("/get-company-profile", auth, getCompanyProfile);

router.post("/get-company-joblisting", auth, getCompanyJobListing);

router.get("/", getCompanies);
router.get("/get-company/:id", getCompanyById);

router.put("/update-company", auth, updateCompanyProfile);

export default router;
