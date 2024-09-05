const applicantCardSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'UserCard',
      required: [true, 'User ID is required!'],
    },
    currentJobTitle: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    currentCompany: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    skills: [
      {
        type: String, // List of skills relevant to job applications
        trim: true,
        maxlength: 50,
      }
    ],
    resumeLink: {
      type: String, // URL to the applicant's resume
      trim: true,
    },
    experience: [
      {
        jobTitle: {
          type: String,
          required: true,
          trim: true,
          maxlength: 100,
        },
        company: {
          type: String,
          required: true,
          trim: true,
          maxlength: 100,
        },
        location: {
          type: String,
          trim: true,
          maxlength: 100,
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
        },
        currentlyWorking: {
          type: Boolean,
          default: false,
        },
        description: {
          type: String,
          trim: true,
          maxlength: 2000,
        },
      }
    ],
    education: [
      {
        institution: {
          type: String,
          required: true,
          trim: true,
          maxlength: 100,
        },
        degree: {
          type: String,
          required: true,
          trim: true,
          maxlength: 100,
        },
        fieldOfStudy: {
          type: String,
          trim: true,
          maxlength: 100,
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
        },
        description: {
          type: String,
          trim: true,
          maxlength: 2000,
        },
      }
    ],
    certifications: [
      {
        title: {
          type: String,
          trim: true,
          maxlength: 100,
        },
        institution: {
          type: String,
          trim: true,
          maxlength: 100,
        },
        dateObtained: {
          type: Date,
        },
        credentialUrl: {
          type: String,
          trim: true,
        },
      }
    ],
    socialProfiles: {
      linkedin: {
        type: String,
        trim: true,
      },
      github: {
        type: String,
        trim: true,
      },
      portfolio: {
        type: String,
        trim: true,
      },
    },
    preferences: {
      jobLocation: {
        type: String, // Preferred job location
        trim: true,
      },
      jobType: {
        type: String,
        enum: ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'TEMPORARY', 'INTERNSHIP', 'FREELANCE'],
      },
      salaryRange: {
        min: {
          type: Number,
          min: 0,
        },
        max: {
          type: Number,
          min: 0,
        },
        currency: {
          type: String,
          default: 'USD',
        },
      },
    }
  }, {
    timestamps: true,
  });
  
  export const ApplicantCard = mongoose.model("ApplicantCard", applicantCardSchema);  