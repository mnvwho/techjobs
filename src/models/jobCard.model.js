import mongoose, {Schema} from "mongoose";

const jobCardSchema = new Schema({
    jobTitle: {
        type: String,
        required: true,
        uppercase: true,
        index: true,
        trim: true,
        minlength: 5,
        maxlength: 25,
        default: 'UNKNOWN JOB TITLE',
    },
    jobDescription: {
        type: String,
        required: true,
        minlength: 200,
        maxlength: 2000,
        trim: true,
        default: 'No Description Provided!',
        index: true,
    },
    jobLevel: {
        type: String,
        enum: ['INTERN','FRESHER', 'JUNIOR', 'MID', 'SENIOR', 'LEAD', 'MANAGER', 'DIRECTOR'],
        required: true,
        index: true,
    },
    jobDesignation: {
        type: String,
        enum: ['SOFTWARE ENGINEER', 'DATA SCIENTIST', 'MACHINE LEARNING ENGINEER', 'DEVOPS ENGINEER', 'FRONTEND DEVELOPER', 'BACKEND DEVELOPER', 'FULL STACK DEVELOPER', 'WEB DEVELOPER', 'MOBILE DEVELOPER', 'UX/UI DESIGNER', 'PRODUCT MANAGER', 'SYSTEMS ANALYST', 'NETWORK ENGINEER', 'DATABASE ADMINISTRATOR', 'CLOUD ENGINEER', 'IT SUPPORT SPECIALIST', 'QUALITY ASSURANCE ENGINEER', 'SECURITY ANALYST', 'BUSINESS INTELLIGENCE ANALYST', 'GAME DEVELOPER', 'APPLICATION SUPPORT ANALYST', 'IT PROJECT MANAGER', 'TECHNICAL ARCHITECT', 'DATA ENGINEER', 'RPA DEVELOPER', 'AI RESEARCHER', 'SOFTWARE ARCHITECT', 'HARDWARE ENGINEER', 'SALES ENGINEER', 'SYSTEM ADMINISTRATOR', 'IT CONSULTANT', 'NETWORK ADMINISTRATOR', 'CRM DEVELOPER', 'ERP CONSULTANT' ],
        required: true,
        index: true,
    },
    jobCategory: {
        type: Schema.Types.ObjectId,
        ref: 'JobCategory',
        required: [true, 'Job_category is required!'],
        index: true,
    },
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'CompanyCard',
        required: [true, 'Company_ID is required!'],
        index: true,
    },
    jobLocationId: {
        type: Schema.Types.ObjectId,
        ref: 'JobLocation',
        required: [true, 'Job_location_ID is required!'],
        index: true,
    },
    jobSalaryRange: {
        minSalary: {
            type: Number,
        },
        maxSalary: {
            type: Number,
        },
        currency: {
            type: String,
            default: 'USD',
        },
        salaryType: {
            type: String,
            enum: ['Annual', 'Monthly', 'Hourly'],
            default: 'Annual',
        },
    },
    jobPostingDate: {
        type: Date,
        default: Date.now,
        required: true,
    },
    noOfApplicants: {
        type: Number,
        default: 0,
        min: [0, 'Number of applicants cannot be negative'],
        required: false,
    },
    jobStatus: {
        type: String,
        enum: ['OPEN', 'CLOSED', 'IN_PROGRESS', 'EXPIRED', 'ON_HOLD'],
        default: 'OPEN',
        required: true,
        index: true,
    },
},{
    timestamps: true
})

export const JobCard = mongoose.model("JobCard", jobCardSchema)