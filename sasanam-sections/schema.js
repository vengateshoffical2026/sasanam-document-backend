const { Schema } = require('mongoose');

const heroStoneSchema = new Schema({
  articleName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 255
  },
  authorName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 255
  },
  article:{
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const makeModel = (mongoose, modelName = 'HeroStone') => {
  return mongoose.model(modelName, heroStoneSchema);
};

module.exports = makeModel;
