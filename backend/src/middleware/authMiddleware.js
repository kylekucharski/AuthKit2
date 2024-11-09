import asyncHandler from "express-async-handler";
import User from "../models/auth/UserMode";

export const protect = asyncHandler(async (req, res, next) => {
    try {
        //check if user is logged in
        const token = req.cookies.token;

        if (!token) {
            res.status(401).json({ message: "Not authorized, please login!" });
        }
        //verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //get user details from the token --> exclude password
        const user = await User.findById(decoded.id).select("-password");

        //check if user exists
        if (!user) {
            res.status(404).json({ message: "User not found!" });
        }

        //set user details in the request object
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Not authroized, token fialed!" });

    }
});