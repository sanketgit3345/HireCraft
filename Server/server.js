import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import dbConnection from "./config/dbConnection.js";
import cookieParser from "cookie-parser";
import { cloudinaryConnect } from "./config/cloudinary.js";

// import authRoutes from "./routes/authRoutes.js";
import router from "./routes/index.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
const app = express();

dotenv.config();

const PORT = process.env.PORT || 4000;

dbConnection();

app.use(cors());
// app.use(xss());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(mongoSanitize());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(router);
app.use(errorMiddleware);
// app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`HUSHH Server running on port ${PORT}`);
});
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});
