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
        uniwue: true,
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
        required: true,
        unique: true,
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

userCardSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userCardSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password = this.password)
}

userCardSchema.methods.generateAccessTokens = function(){
    return jwt.sign({
        _id: this._id,
        email: this.email,
        phoneNumber: this.phoneNumber,
        role: this.role
    }, process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}

userCardSchema.methods.generateRefreshTokens = function(){
    return jwt.sign({
        _id: this._id
    }, process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
}

userCardSchema.methods.generateResetTokens = function(){
    return jwt.sign({
        _id: this._id
    }, process.env.RESET_TOKEN_SECRET,
    {
        expiresIn: process.env.RESET_TOKEN_EXPIRY
    })
}

export const {UserCard} = mongoose.model("UserCard", userCardSchema);