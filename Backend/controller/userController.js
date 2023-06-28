const User = require('../models/user');

exports.register = async (req, res, next) => {
  const userData = await User.create(req.body);
  res.status(201).json({ userData });
};
exports.login = async (req, res) => {
  res.send(' login user');
};
exports.updateUser = async (req, res) => {
  res.send(' updateUser user');
};
