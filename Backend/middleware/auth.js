const jwt = require('jsonwebtoken');
const { BadRequestApi } = require('../Errors');

exports.isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new BadRequestApi('Autorize first');
  }
  const decoded = jwt.decode(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
};
