import express from "express";
import auth from "./routes/auth.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./db/connectDB.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

const app = express();

app.use(cors({
  origin: clientUrl,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use("/auth", auth);

// start the Express server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server listening on port ${PORT}`);
});