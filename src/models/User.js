const mongoose = require('mongoose');
const md5 = require('md5');
const bcrypt = require('bcrypt');

const rtString = {
  type: String,
  required: true,
  trim: true
};

const UserSchema = new mongoose.Schema({
  username: {
    ...rtString,
    unique: true
  },
  email: rtString,
  password: rtString,
  avatar: String,
  joinDate: {
    type: Date,
    default: Date.now
  },
  favorites: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: 'Post'
  }
});

UserSchema.pre('save', function(next) {
  this.avatar = `http://gravatar.com/avatar/${md5(this.username)}?d=identicon`;
  next();
});

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model('User', UserSchema);
