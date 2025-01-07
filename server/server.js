import express from "express";
import auth from "./routes/auth.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use("/auth", auth);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});