import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const employerCardSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
        minlength: 8, 
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 100,
    },
    role: {
        type: String,
        enum: ['admin', 'recruiter', 'hr', 'manager'],
        default: 'recruiter',
    },
    companyProfile: {
        type: Schema.Types.ObjectId,
        ref: 'CompanyCard', 
    },
    employerAvatar: {
        type: String,
        trim: true,
        required: true,
    },
    employerCoverImage: {
        type: String,
        trim: true,
        required: false,
        default: '',
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isLocked: {
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
        type: String,
    },
}, {
    timestamps: true
});

employerCardSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

employerCardSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password = this.password)
}

employerCardSchema.methods.generateAccessTokens = function(){
    return jwt.sign({
        _id: this._id,
        username: this.username,
        fullName: this.fullName,
        role: this.role
    }, process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}

employerCardSchema.methods.generateRefreshTokens = function(){
    return jwt.sign({
        _id: this._id
    }, process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
}

employerCardSchema.methods.generateResetTokens = function(){
    return jwt.sign({
        _id: this._id
    }, process.env.RESET_TOKEN_SECRET,
    {
        expiresIn: process.env.RESET_TOKEN_EXPIRY
    })
}

export const {EmployerCard} = mongoose.model('EmployerCard', employerCardSchema)