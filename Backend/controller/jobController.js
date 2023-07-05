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
  const createdBy = req.user._id;

  const matchStagePipe = [
    {
      $match: { createdBy: String(createdBy) },
    },
    {
      $group: {
        _id: '$jobStatus',
        count: {
          $sum: 1,
        },
      },
    },
  ];

  let aggregationStats = await Job.aggregate(matchStagePipe);

  aggregationStats = aggregationStats.reduce((acc,cur) =>{
    const {_id, count} = cur
    acc[_id] = count
    return acc
  },{})

  const defaultStats = {
    'Connected' : aggregationStats['Connected'] || 0,
    'Pending': aggregationStats['Pending'] || 0,
    'Feedback': aggregationStats['Feedback'] || 0,
    'Interview': aggregationStats['Interview'] || 0,
    'Declined': aggregationStats['Declined'] || 0,
    'Aproved': aggregationStats['Aproved'] || 0
  }

  res.status(200).json({ defaultStats });
};
