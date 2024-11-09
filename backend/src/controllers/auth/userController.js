import asyncHandler from "express-async-handler";
import User from "../../models/auth/UserMode.js";
import generateToken from "../../helpers/generateToken.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    //validation
    if (!name || !email || !password) {
        // 400 Bad Request
        res.status(400).json({ message: "All fields are erquired" });
    }

    //check password length (Make stronger later on --> check for Uppercase and unique symbols)
    if (password.length < 6) {
        return res
        .status(400)
        .json({message: "Password must be at least 6 characters "});
    }

    // check if user already exists
    const userExists = await User.findOne({email});

    if (userExists) {
        //bad request
        return res.status(400).json({ message: "User already exists" });
    }

    //create new user
    const user = await User.create ({
        name, 
        email, 
        password,
    });

    //generate token with user id
    const token = generateToken(user._id);

    //send back the user and token in response ot the client
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
        sameSite: true,
        secure: true
    });

    if(user) {
        const {_id, name, email, role, photo, bio, isVerified } = user; 

        //201 created
        res.status(201).json({
            _id, 
            name, 
            email,
            role,
            photo,
            bio,
            isVerified,
            token,
        });
    }else {
        res.status(400).json({ message: "Invalid user data" });
    }
});

//user login
export const loginUser = asyncHandler(async (req, res) => {
    //get email and password from req.body
    const {email, password } = req.body;

    //validation
    if (!email || !password) {
        //400 bad request
        return res.status(400).json({ message: "All fields are required" }); 
    }

    //check if user exists
    const userExists = await User.findOne({ email});
    if (!userExists) {
        return res.status(404).jason({ message: "User not found, sign up!"});
    }

    //check if password matches the hashed password in the database
    const isMatch = await bcrypt.compare(password, userExists.password);

    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    //generate token with user id
    const token = generateToken(userExists._id);

    if(userExists && isMatch) {
        const {_id, name, email, role, photo, bio, isVerified } = userExists;

        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
            sameSite: true,
            secure: true,
        });
        //send back the user and token in the response to the client
        res.status(200).json({
            _id, 
            name,
            email,
            role,
            photo,
            bio,
            isVerified,
            token,
        });
    } else {
        res.status(400).json({ message: "Invalid email or password" });
    }
});

//logout user
export const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("token");

    res.status(200).json({ message: "User logged out"})
});

//get user
export const getUser = asyncHandler(async (req, res) => {
    //get user details from the token --> exclude password
});