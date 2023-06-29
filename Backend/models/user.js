const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;

const userSchema = new Schema({
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
    unique: true,
  },
  password: {
    type: String,
    require: true,
    mixLength: 4,
    maxLength: 20,
    trim: true,
    select: false,
  },
});

// Encrypting pass before saving user

userSchema.pre('save', async function (next) {
  //in case of pass restoration func
  if (!this.isModified('password')) {
    next();
  }

  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);

  //bcryptjs
  // const salt = await bcrypt.salt(10)
  // this.password = await bcrypt.hash(this.password, salt)
});

// Return JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};
userSchema.methods.comparePassword = async function (userPassword) {
  console.log(userPassword, this.password)
  // select: false option for the password, have a few options:
  // Remove the select: false option from the password
  // Use the select('+password')
  

  return  await bcrypt.compare(userPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
