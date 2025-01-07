import express from "express";
import cors from "cors";
import auth from "./routes/auth.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/auth", auth);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});