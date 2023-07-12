// Create and send token and save in cookie

const sendToken = (user, statusCode, res) => {
  // CreateJwt token
  const token = user.getJwtToken();

  //Options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: 'none',
    // secure
  };

  // console.log(res.cookie('tokenPmMan', token, options))
  res.status(statusCode).cookie('tokenPmMan', token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;
