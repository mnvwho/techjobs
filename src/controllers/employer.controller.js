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

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordPattern.test(password)) {
        throw new ApiError(
            400,
            "Password is weak!"
            );
        }

const existedEmployerCard = EmployerCard.findOne(username)
        if (existedEmployerCard) {
            throw new ApiError(400, "Employer already exists!")
        }

const employerAvatarLocalPath = req.files?.employerAvatar[0]?.path;
const employerCoverImageLocalPath = req.files?.employerCoverImage[0]?.path;

    if(!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required!")
    }

const employerAvatar = await uploadOnCloudinary(employerAvatarLocalPath)
const employerCoverImage = await uploadOnCloudinary(employerCoverImageLocalPath)

    if(!employerAvatar) {
        throw new ApiError(400, "Avatar is required!")
    }

const isActive = true;
const isLocked = false;

// const toggleAccountStatus = asyncHandler(async (req, res) => {
//     const {employerId} = req.params;
//     const {isActive, isLocked} = req.body;

    if (!employer) {
        throw new ApiError(404, "Employer not found!")
    }

    if (typeof isActive !== "undefined") {
        EmployerCard.isActive = isActive;
    }

    if (typeof isLocked !== "undefined") {
        EmployerCard.isLocked = isLocked;
    }

    await employer.save();

    res.status(200).json({message: "Employer account status updated successfully!", employer})
// })

const employer = await EmployerCard.create({
    username: username.toLowerCase(),
    password,
    fullName,
    role,
    employerAvatar: employerAvatar.url,
    employercoverImage: employerCoverImage?.url || "",
    isActive,
    isLocked,
    })


const createdEmployer = await EmployerCard.findById(employer._id).select(
    "-password -refreshTocken"
    )

return res.status(201).json(
    new ApiResponse(200, createdEmployer, "Employer registered successfully!")
)

})

export {
    registerEmployer,
}