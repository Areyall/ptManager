const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: 'Loging error' });
};

module.exports = errorHandlerMiddleware
