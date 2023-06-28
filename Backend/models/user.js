const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
    select: false
  },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;


// Encrypting pass before saving user

    User.pre('save', async ()=>{
        //in case of pass restoration func
        if (!this.isModified('password')) {
            next()
        }
        const salt = await bcrypt.salt(10)
        this.password = await bcrypt.hash(this.password, salt)
    })

// Return JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
  }