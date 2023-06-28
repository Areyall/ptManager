const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    require: true,
    mixLength: 3,
    maxLength: 10,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    // validate prop vith npm lib recomended for prod
    trim: true,
    unique: true
  },
  password: {
    type: String,
    require: true,
    mixLength: 4,
    maxLength: 20,
    trim: true,
  },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
