import mongoose, { Schema } from "mongoose";

const postalCodePatterns = {
    Asia: /^(\d{5,6}|\d{3}-\d{4})$/,
    NorthAmerica: /^(\d{5}(-\d{4})?|[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d)$/,
    Europe: /^(\d{5}|[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}|GIR 0AA|[0-9]{4} ?[A-Z]{2})$/,
    Russia: /^\d{6}$/,
    SouthAmerica: /^(\d{5}(-\d{3})?|[A-Z]\d{4}[A-Z]{2,3})$/,
    Africa: /^\d{4,6}$/,
    Oceania: /^\d{4}$/
  };

const jobLocationSchema = new Schema({
    locationName: {
        type: String,
        required: [true, 'Location name is required!'],
        trim: true,
        maxlength: 100,
    },
    address: {
        type: String,
        trim: true,
        maxlength: 200,
    },
    city: {
        type: String,
        required: [true, 'City is required!'],
        index: true,
        trim: true,
        maxlength: 20,
    },
    state: {
        type: String,
        trim: true,
        maxlength: 25,
    },
    country: {
        type: String,
        required: [true, 'Country is required!'],
        index: true,
        trim: true,
        maxlength: 30,
    },
    postalCode: {
        type: String,
        trim: true,
        maxlength: 20,
        validate: {
            validator: function (v) {
            
            const regex = postalCodePatterns[this.continent] || /^[A-Za-z0-9\s\-]{3,10}$/;

            return regex.test(v);
            },
            message: (props) => `${props.value} is not a valid postal code for the specified continent: ${props.instance.continent}!`,
        }
    },
    remote: {
        type: Boolean,
        default: false,
    },
    locationType: {
        type: String,
        enum: ['ONSITE', 'REMOTE', 'HYBRID'],
        required: [true, 'Location type is required!'],
    },
    timezone: {
        type: String,
        trim: true,
        default: 'UTC',
    },
    }, {
    timestamps: true,
});

export const JobLocation = mongoose.model("JobLocation", jobLocationSchema);