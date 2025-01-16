import express from "express";

import {
  createApplication,
  deleteApplication,
  getAllApplicationsForJob,
  getAllApplicationsForUser,
  updateApplicationStatus,
} from "../controllers/application.js";

import { auth, isSeeker, isCompany } from "../middleware/auth.js";

const router = express.Router();

router.post("/apply-job/:jobId", auth, isSeeker, createApplication);
router.delete(
  "/delete-application/:applicationId",
  auth,
  isSeeker,
  deleteApplication
);
router.put(
  "/update-application/:applicationId",
  auth,
  isCompany,
  updateApplicationStatus
);

router.get(
  "/user-getapplication/:userId",
  auth,
  isSeeker,
  getAllApplicationsForUser
);
router.get(
  "/company-getapplication/:jobId",
  auth,
  isCompany,
  getAllApplicationsForJob
);

export default router;
