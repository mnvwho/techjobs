import mongoose, { Schema } from 'mongoose';

const companyCardSchema = new Schema({
    companyName: {
        type: String,
        required: true, 
        trim: true, 
        minlength: 2, 
        maxlength: 100, 
        index: true, 
    },
    companyLogo: {
        type: String,
        trim: true,
        required: true,
    },
    coverImage: {
        type: String,
        trim: true,
        required: false,
        default: 'default-cover-image.png',
    },
    companyWebsite: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        match: /^(https?:\/\/)?([\w\d-]+\.)+[a-zA-Z]{2,6}(\/[\w\d-]*)*\/?$/, 
        default: '',
    },
    companyDescription: {
        type: String,
        trim: true,
        required: true,
        maxlength: 500, 
        default: 'No description provided',
    },
    companyContactInfo: {
        phone: {
            type: String,
            trim: true,
            required: true,
            match: /^\+?[1-9]\d{1,14}$/,
            default: '',
        },
        email: {
            type: String,
            trim: true,
            reqiured: true,
            lowercase: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            default: '',
            required: true,
        },
        address: {
            type: String,
            trim: true,
            reqiured: true,
            default: 'Not provided',
        },
    },
}, {
    timestamps: true 
});

export const CompanyCard = mongoose.model("CompanyCard", companyCardSchema);
