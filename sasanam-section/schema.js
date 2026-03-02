const { Schema, model } = require('mongoose');

const sectionSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Section name is required'],
    trim: true,
    minlength: [1, 'Section name cannot be empty'],
    maxlength: [100, 'Section name cannot exceed 100 characters']
  }
}, { timestamps: true });

// Create unique index on name for better query performance
sectionSchema.index({ name: 1 });

const makeSectionModel = (mongoose) => {
  return mongoose.model('Section', sectionSchema, 'sections');
};

module.exports = makeSectionModel;
