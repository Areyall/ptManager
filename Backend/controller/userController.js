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
  const { email, password } = req.body;
  if (!email || !password) {
    // use error handler for detailed UI
    // like  return next(new ErrorHandler('Please enter email & password', 400));
    throw new BadRequestApi('Empty walues was sent');
    // console.log('Empty walues was sent');
  }
  // simple dew error handlers
  // Handle database errors

  // Finding user in database
  try {
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
    // const token = user.getJwtToken();
    const isOwnPassword = await user.comparePassword(password);
    if (!isOwnPassword) {
      throw new BadRequestApi('Wrong Password');
    }
    if (isOwnPassword) {
      sendToken(user, 200, res);
    }

    // catch block to handle any database-related errors
  } catch (error) {
    throw new BadRequestApi('Wrong walues was sent');
    // return console.log('Database error');
  }
};

exports.getUserProfile = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
};

exports.updateUser = async (req, res) => {
  const { email, username } = req.body;

  if (!email || !username) {
    throw new BadRequestApi('Provide all values');
  }

  // less data -> Model update aproach 2 -> less officient
  const user = await User.findById(req.user.id);

  user.email = email;
  user.username = username;

  await user.save();

  const token = user.getJwtToken();

  res.status(200).json({
    user,
    token,
  });
};
