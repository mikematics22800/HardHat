import express from "express";
import { login, register, logout, verifyEmail, resetPassword, checkAuth } from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/login", login)
router.post("/register", register)
router.get("/logout", logout)
router.post("/verify-email", verifyEmail)
router.post("/reset-password/:token", resetPassword)
router.get('/check-auth', verifyToken, checkAuth)

export default router;