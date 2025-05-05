import express, { Application } from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb-connection";
import { errorHandler } from "./middleware/error-handler";
import authRouter from "./routes/auth-route";
import cencusRouter from "./routes/cencus-route";
import cookieRoute from "./routes/cookie-route";
import residentRouter from "./routes/resident-route";
import imageDetectionRoute from "./routes/image-detection-route";
import residentAdminValidationUpdateRoute from "./routes/resident-admin-update-validation-route";
import verificationCodeRoute from "./routes/verification-code-route";
import healthRouter from "./routes/health-route";
import bodyParser from "body-parser";
const app: Application = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = '0.0.0.0';

const allowedOrigins = [
  "https://barangay-ly7m.onrender.com",
  "http://localhost:5173",
  "https://smartbarangayconnect.com",
  "https://drs.smartbarangayconnect.com",
  "https://cyms.smartbarangayconnect.com",
  "https://bciacms.smartbarangayconnect.com",
];
const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use("/api/health", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/cencus", cencusRouter);
app.use("/api/cookie", cookieRoute);
app.use("/api/resident", residentRouter);
app.use("/api/image", imageDetectionRoute);
app.use("/api/residentupdate", residentAdminValidationUpdateRoute);
app.use("/api/verification", verificationCodeRoute);
app.use(errorHandler);

// Start the server
connectDB().then(() => {
  app.listen(PORT, HOST, () => {
    console.log(`Server running on ${HOST}:${PORT}`);
  });
});
