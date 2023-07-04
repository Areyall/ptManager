// model: company, position,status,type,location,date,comment

const BadRequestApi = require('../Errors/BadRequestError');
const Job = require('../models/job');

exports.createJob = async (req, res) => {
  const { position, company } = req.body;
  if (!position || !company) {
    throw new BadRequestApi('Provide necessary values');
  }
  
  const job = await Job.create(req.body);
  res.status(200).json({ job });
};
exports.deleteJob = async (req, res) => {
  res.send(' deleteJob Job');
};
exports.getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user._id });

  res.status(200).json({ jobs, totalJobs: jobs.length, numberOfPages: 1 });
};

exports.updateJob = async (req, res) => {
  res.send(' updateJob Job');
};

exports.showStatsJob = async (req, res) => {
  res.send(req.user);
};
