const mongoose = require('mongoose');

const requiredString = {
  type: String,
  required: true
};

const PostSchema = new mongoose.Schema({
  title: requiredString,
  imageUrl: requiredString,
  categories: {
    type: [String],
    required: true
  },
  description: requiredString,
  createdDate: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Number,
    default: 0
  },
  // property ('createdBy') === path
  // ref ('User') === model
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  messages: [
    {
      messageBody: requiredString,
      messageDate: {
        type: Date,
        default: Date.now
      },
      messageUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      }
    }
  ]
});

// CREATE INDEX TO SEARCH ON ALL FIELDS OF POSTS
PostSchema.index({
  '$**': 'text'
});

module.exports = mongoose.model('Post', PostSchema);
