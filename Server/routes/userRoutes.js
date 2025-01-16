import express from "express";
import { auth } from "../middleware/auth.js";
import { getUser, updateUser } from "../controllers/userController.js";

const router = express.Router();

// GET user
router.post("/get-user", auth, getUser);

// UPDATE USER || PUT
router.put("/update-user", auth, updateUser);

export default router;
