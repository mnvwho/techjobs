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
// import {ApiError} from "../utils/ApiError.js"
// import employerCard from "../models/employerCard.model.js"
// import {uploadOnCloudinary} from "../utils/cloudinary.js"
// import { ApiResponse } from "../utils/ApiResponse.js"
// import jwt from "jsonwebtoken"
// import mongoose from "mongoose"


const registerEmployer = asyncHandler (async (req, res) => {
    const {username, password, fullName, role} = req.body
    console.log("username", username);
    
})

export {
    registerEmployer,
}