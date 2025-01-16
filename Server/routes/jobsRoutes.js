import express from "express";

import { auth, isCompany } from "../middleware/auth.js";
import {
  createJob,
  updateJob,
  getJobPosts,
  getJobById,
  deleteJobPost,
} from "../controllers/jobController.js";

const router = express.Router();

router.post("/upload-job", auth, isCompany, createJob);
router.delete("/delete-job/:jobId", auth, isCompany, deleteJobPost);
router.put("/update-job/:jobId", auth, isCompany, updateJob);

router.get("/find-jobs", getJobPosts);
router.get("/get-job-detail/:id", getJobById);

export default router;
