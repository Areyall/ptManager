exports.createJob = (req, res) => {
  res.send(' createJob Job');
};
exports.deleteJob = (req, res) => {
  res.send(' deleteJob Job');
};
exports.getAllJobs = (req, res) => {
  res.send(' getAllJobs Job');
};

exports.updateJob = (req, res) => {
  res.send(' updateJob Job');
};

exports.showStatsJob = (req, res) => {
  res.send( req.user);
};
