import express from 'express';
import {
    registerUser,
    loginUser,
    logoutUser,
    getUser
} from '../controllers/auth/userController.js';

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/user", protect, getUser);

export default router;