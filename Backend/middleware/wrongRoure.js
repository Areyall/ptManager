const wrongRoute = (req, res, next) => {
  res.status(404).send('Route does not exist');
};

module.exports = wrongRoute;
