const jwt = require('jsonwebtoken');
const { BadRequestApi } = require('../Errors');
const User = require('../models/user');

exports.isAuthenticatedUser = async (req, res, next) => {
  // NOT ! const cookie = req.cookies
  // NOT ! token cookie = req.cookies
  // -> its name of the token/cookie since setup
  const { tokenPmMan } = req.cookies;
  if (!tokenPmMan) {
    throw new BadRequestApi('Autorize first');
  }
  try {
    
    const verify = jwt.decode(tokenPmMan, process.env.JWT_SECRET);
    req.user = await User.findById(verify.id);
  
    next();
  } catch (error) {
    return res.status(401).json({error : 'Unauthorized'})
  }
};

// exports.isAuthenticatedUser = async (req, res, next) => {
//   const { token } = req.cookies;

//   if (!token) {
//     throw new BadRequestApi('Autorize first');
//   }
//   const decoded = jwt.decode(token, process.env.JWT_SECRET);
//   req.user = await User.findById(decoded.id);
//   next();
// };
