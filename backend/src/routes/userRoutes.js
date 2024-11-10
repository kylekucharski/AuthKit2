import express from 'express';
import {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    updateUser,
    userLoginStatus,
    verifyEmail,
    verifyUser,
    forgotPassword,
    resetPassword,
    changePassword
} from '../controllers/auth/userController.js';

import {
    protect,
    adminMiddleware,
    creatorMiddleware
} from "../middleware/authMiddleware.js";

import {
    deleteUser,
    getAllUsers,
} from "../controllers/auth/adminController.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/user", protect, getUser);
router.patch("/user", protect, updateUser);

// admin routes
router.delete("/admin/users/:id", protect, adminMiddleware, deleteUser);

// get all users
router.get("/admin/users", protect, creatorMiddleware, getAllUsers);

// login status
router.get("/login-status", userLoginStatus);

//email verification 
router.post("/verify-email/", protect, verifyEmail);

//verify user --> email verification
router.post("/verify-user/:verificationToken", verifyUser);

//forgot password
router.post("/forgot-password", forgotPassword);

//reset password
router.post("/reset-password/:resetPasswordToken", resetPassword);

//change password
router.patch("/change-password", protect, changePassword);

export default router;