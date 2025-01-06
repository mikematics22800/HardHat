import express from "express";
import cors from "cors";
import users from "./routes/user.js";
import { authMiddleware } from "./utils/auth.js"; 

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use(authMiddleware);
app.use("/user", users);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});