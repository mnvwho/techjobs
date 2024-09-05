import mongoose, { Schema } from "mongoose";

const userCardSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required!'],
        trim: true,
        maxlength: 50,
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required!'],
        trim: true,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please provide a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minlength: 8,
    },
    role: {
        type: String,
        enum: ['APPLICANT', 'RECRUITER', 'ADMIN'],
        default: 'APPLICANT',
        required: true,
    },
    phoneNumber: {
        type: String,
        trim: true,
        match: [/^\+?\d{10,15}$/, 'Please provide a valid phone number'],
    },
    userAvatar: {
            type: String,
            trim: true,
            required: true,
    },
    userCoverImage: {
        type: String,
        trim: true,
        required: false,
        default: '',
    },
    isActive: {
        type: Boolean,
        default: false, 
    },
    accessToken: {
            type: String,
        },
    refreshToken: {
        type: String,
    },
    resetToken: {
        type: Date,
    }
    }, {
    timestamps: true, 
});

export const UserCard = mongoose.model("UserCard", userCardSchema);