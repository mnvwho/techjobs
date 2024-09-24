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
import { EmployerCard } from "../models/employerCard.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import validator from 'validator';
import zxcvbn from 'zxcvbn';

// import jwt from "jsonwebtoken"
// import mongoose from "mongoose"


const registerEmployer = asyncHandler (async (req, res) => {
    const {username, password, fullName, role} = req.body
    
    if(
        [username, password, fullName, role].some((field) =>
        field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required!")
    }

const usernamePattern = /^[a-zA-Z0-9]{3,20}$/;
if (!usernamePattern.test(username)) {
    throw new ApiError(400, "Username must be alphanumeric and between 3 to 20 characters!");
}

const normalizedUsername = username.toLowerCase();

const existingUsername = await EmployerCard.findOne({ username: normalizedUsername });

if (existingUsername) {
    throw new ApiError(400, "Username is already taken! Please choose a different one.");
}

const existingEmployer = await EmployerCard.findOne({ 
    username: normalizedUsername,
    password
});
if (existingEmployer) {
    throw new ApiError(400, "Employer already exists!");
}

const allowedRoles = ['admin', 'recruiter', 'hr', 'manager'];
    if (!allowedRoles.includes(role)) {
        throw new ApiError(400, `Invalid role. Allowed roles are: ${allowedRoles.join(", ")}`);
    }

    if (!validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })) {
        throw new ApiError(400, "Password is weak! It must be at least 8 characters long and contain uppercase, lowercase, a number, and a special character.");
    }

const passwordStrength = zxcvbn(password);

    if (passwordStrength.score < 3) {
        throw new ApiError(400, "Password is too weak! Please choose a stronger password.");
    }

// const existedEmployerCard = await EmployerCard.findOne({
//     $or: [{ username }, { password }]
//     })
//     if (existedEmployerCard) {
//         throw new ApiError(400, "Employer already exists!")
//     }

const employerAvatarLocalPath = req.files?.avatar[0]?.path;
const employerCoverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!employerAvatarLocalPath) {
        throw new ApiError(400, "Avatar is required!")
    }

const employerAvatar = await uploadOnCloudinary(employerAvatarLocalPath)
const employerCoverImage = await uploadOnCloudinary(employerCoverImageLocalPath)

    if(!employerAvatar) {
        throw new ApiError(400, "Avatar is required!")
    }

// const isActive = true;
// const isLocked = false;

//     if (!employer.isActive) {
//         throw new ApiError(403, "Account is inactive! Please contact support.");
//     }

//     if (employer.isLocked) {
//         throw new ApiError(403, "Account is locked due to multiple failed login attempts! Please contact support.");
//     }

const employer = await EmployerCard.create({
    username: username.toLowerCase(),
    password,
    fullName,
    role,
    employerAvatar: employerAvatar.url,
    employerCoverImage: employerCoverImage?.url || "",
    isActive,
    isLocked,
    })

const createdEmployer = await EmployerCard.findById(employer._id).select(
    "-password -refreshToken -resetToken"
    )

return res.status(201).json(
    new ApiResponse(200, createdEmployer, "Employer registered successfully!")
)

})

export {
    registerEmployer,
}