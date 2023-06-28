const User = require('../models/user');

exports.register = async (req, res, next) => {
  const userData = await User.create(req.body);
  const token = User.getJwtToken();
  res
    .status(201)
    .json({
      user: { username: userData.username, email: userData.email },
      token,
    });
};
exports.login = async (req, res) => {
  res.send(' login user');
};
exports.updateUser = async (req, res) => {
  res.send(' updateUser user');
};
