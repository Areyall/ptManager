const { BadRequestApi } = require('../Errors/index.js');
const User = require('../models/user');
const sendToken = require('../utils/jwtToken.js');

exports.register = async (req, res, next) => {
  const userData = await User.create(req.body);
  const token = userData.getJwtToken();
  res.status(201).json({
    // user: { username: userData.username, email: userData.email },
    userData,
    token,
  });
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
      // use error handler for detailed UI
      // like  return next(new ErrorHandler('Please enter email & password', 400));
      throw new BadRequestApi('Empty walues was sent');
      // console.log('Empty walues was sent');
    }
    // simple dew error handlers
    // Handle database errors

    // Finding user in database
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return console.log('Invalid Email or Password');
    }

    // Checks if password is correct or not
    // const isPasswordMatched = await user.comparePassword(password);

    // if (!isPasswordMatched) {
    //   return console.log('Invalid Email or Password');
    // }
    // res.send(' login user');
    // sendToken(user, 200, res);
    const token = user.getJwtToken();
    const isOwnPassword = await user.comparePassword(password);
    console.log(isOwnPassword);
    if (isOwnPassword) {
      res.status(200).json({
        // user: { username: userData.username, email: userData.email },
        user,
        token,
      });
    }

    // catch block to handle any database-related errors
  } catch (error) {
    return console.log('Database error');
  }
};
exports.updateUser = async (req, res) => {
  res.send(' updateUser user');
};
