// get employer details from frontend
// validation - not empty
// check if employer is already exist: username & password
// check for images, check for avatar
// upload them to cloudinary, avatar
// create employer object - create entry in db
// remove password and refresh token field from the response
// check for employer creation
// return res

import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {UserCard} from "../models/userCard.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
// import { ApiResponse } from "../utils/ApiResponse.js"
// import jwt from "jsonwebtoken"
// import mongoose from "mongoose"


const registerUser = asyncHandler (async (req, res) => {
    const {firstName, lastName, email, password, role, phoneNumber} = req.body
    console.log("email", email);
        
    if(
        [firstName, lastName, email, password, role, phoneNumber].some((field) =>
        field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required!")
    }

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
        throw new ApiError(400, "Invalid email address!");
    }

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordPattern.test(password)) {
        throw new ApiError(
            400,
            "Password is weak!"
            );
        }

const phonePattern = /^\+?\d{10,15}$/;
    if (!phonePattern.test(phoneNumber)) {
        throw new ApiError(400, "Invalid phone number!");
    }

const existedUserCard = UserCard.findOne({
        $or: [{email, phoneNumber}]
    })
        if (existedUserCard) {
            throw new ApiError(400, "User already exists!")
        }

const userAvatarLocalPath = req.files?.userAvatar[0]?.path;
const userCoverImageLocalPath = req.files?.userCoverImage[0]?.path;

    if(!userAvatarLocalPath) {
        throw new ApiError(400, "Avatar is required!")
    }

const userAvatar = await uploadOnCloudinary(userAvatarLocalPath)
const userCoverImage = await uploadOnCloudinary(userCoverImageLocalPath)

    if(!userAvatar) {
        throw new ApiError(400, "Avatar is required!")
    }

UserCard.create({
    fullName,
    lastName,
    userAvatar: userAvatar.url,
    usercoverImage: userCoverImage?.url || "",
    email,
    password,
    role,
    phoneNumber,
    })

})

export {
    registerUser,
}