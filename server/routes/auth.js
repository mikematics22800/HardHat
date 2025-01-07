import express from "express";
import { login, register, logout, verifyEmail, resetPassword, verifyToken, checkAuth } from "../controllers/authController";

const router = express.Router();

router.get("/login", login)
router.post("/register", register)
router.get("/logout", logout)
router.post("/verify-email", verifyEmail)
router.post("/reset-password/:token", resetPassword)
router.get('/check-auth', verifyToken, checkAuth)