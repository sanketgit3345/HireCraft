import express from "express";

import authRoute from "./authRoutes.js";
import userRoute from "./userRoutes.js";
import companyRoute from "./CompaniesRoutes.js";
import jobRoute from "./jobsRoutes.js";
import applicationRoute from "./applicationRoutes.js";

import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
const router = express.Router();

const path = "/api/v1/";

router.use(`${path}auth`, authRoute);
router.use(`${path}user`, userRoute);
router.use(`${path}company`, companyRoute);
router.use(`${path}jobs`, jobRoute);
router.use(`${path}application`, applicationRoute);

export default router;
