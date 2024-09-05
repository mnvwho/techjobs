import mongoose, { Schema } from "mongoose";

const jobApplicationSchema = new Schema({
    jobId: {
        type: Schema.Types.ObjectId,
        ref: 'JobCard',
        required: [true, 'Job_ID is required!'],
        index: true,
    },
    applicantId: {
        type: Schema.Types.ObjectId,
        ref: 'ApplicantCard', 
        required: [true, 'Applicant_ID is required!'],
        index: true,
    },
    applicationDate: {
        type: Date,
        default: Date.now, 
        required: true,
    },
    resumeLink: {
        type: String,
        required: [true, 'Resume link is required!'],
        trim: true,
    },
    coverLetter: {
        type: String,
        trim: true,
        maxlength: 5000,
    },
    status: {
        type: String,
        enum: ['APPLIED', 'IN_REVIEW', 'SHORTLISTED', 'INTERVIEW_SCHEDULED', 'OFFERED', 'REJECTED', 'WITHDRAWN'],
        default: 'APPLIED',
        required: true,
        index: true,
    },
    recruiterId: {
        type: Schema.Types.ObjectId,
        ref: 'EmployerCard', // Reference to the recruiter or HR person handling the application
        required: false,
    },
    attachments: [
        {
        fileName: {
            type: String, // Name of the file (e.g., portfolio, certifications)
            trim: true,
        },
        fileUrl: {
            type: String, 
            required: false,
            trim: true,
        },
        },
    ],
    }, {
    timestamps: true, 
});

export const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);