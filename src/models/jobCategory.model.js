// import mongoose, { Schema } from 'mongoose';

// // Define the jobCategory schema
// const jobCategorySchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     uppercase: true, // Optional: Standardize category names to uppercase
//   },
//   description: {
//     type: String,
//     trim: true,
//     maxlength: 500, // Example limit
//   },
//   slug: {
//     type: String,
//     unique: true,
//     trim: true,
//     lowercase: true, // Standardize slug to lowercase
//     required: true,
//   },
//   parentCategory: {
//     type: Schema.Types.ObjectId,
//     ref: 'JobCategory', // Reference to another jobCategory document
//     default: null, // No parent category by default
//   },
//   isActive: {
//     type: Boolean,
//     default: true, // Category is active by default
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // Create indexes
// jobCategorySchema.index({ name: 1 }); // Index on name
// jobCategorySchema.index({ slug: 1 }); // Index on slug

// // Middleware to update `updatedAt` field
// jobCategorySchema.pre('save', function(next) {
//   this.updatedAt = Date.now();
//   next();
// });

// export const JobCategory = mongoose.model('JobCategory', jobCategorySchema);
