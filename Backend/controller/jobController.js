// model: company, position,status,type,location,date,comment/

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
  const { search, jobStatus, jobType, jobStage, sort } = req.query;
  console.log("🚀 ~ jobStage:", jobStage)
  console.log("🚀 ~ jobType:", jobType)
  console.log("🚀 ~ jobStatus:", jobStatus)
  console.log("🚀 ~ search:", search)
  console.log("🚀 ~ sort:", sort)

  const mainELement = {
    createdBy: req.user._id,
  };

  if (jobStatus && jobStatus !== 'all') {
    mainELement.jobStatus = jobStatus;
  }
  if (jobType && jobType !== 'all') {
    mainELement.jobType = jobType;
  }
  if (jobStage && jobStage !== 'all') {
    mainELement.jobStage = jobStage;
  }
  if (search) {
    mainELement.position = { $regex: search, $options: 'i' };
  }

  let finalSort = Job.find(mainELement);

  if (sort === 'updated') {
    finalSort = finalSort.sort('-updatedAt');
  }
  if (sort === 'latest') {
    finalSort = finalSort.sort('-createdAt');
  }
  if (sort === 'oldest') {
    finalSort = finalSort.sort('createdAt');
  }

  let limit = Number(req.query.limit || 3),
    page = Number(req.query.page || 1),
    skip = (page - 1) * limit;

    finalSort.skip(skip).limit(limit);
  

  const jobs = await finalSort;
  totalJobs = await Job.countDocuments(mainELement);
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(200).json({ jobs, totalJobs: jobs.length, numberOfPages: numOfPages, limit });
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
  const monthlyApplicationsPipe = [
    {
      $match: { createdBy: String(createdBy) },
    },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: {
          $sum: 1,
        },
      },
    },
    {
      $sort: { '_id.year': -1, '_id.month': -1 },
    },
    {
      $limit: 6,
    },
  ];

  let aggregationStats = await Job.aggregate(matchStagePipe);
  let monthlyApplicationsStats = await Job.aggregate(monthlyApplicationsPipe);

  aggregationStats = aggregationStats.reduce((acc, cur) => {
    const { _id, count } = cur;
    acc[_id] = count;
    return acc;
  }, {});

  monthlyApplicationsStats = monthlyApplicationsStats
    .map((el) => {
      const formatYearMonth = (year, month) => {
        const date = new Date(year, month - 1);

        const options = { year: 'numeric', month: 'short' };
        const formattedDate = date.toLocaleString('en-US', options);

        return formattedDate;
      };
      const {
        _id: { year, month },
        count,
      } = el;
      const newDate = formatYearMonth(year, month);
      return { newDate, count };
    })
    .reverse();

  const defaultStats = {
    Connected: aggregationStats['Connected'] || 0,
    Pending: aggregationStats['Pending'] || 0,
    Feedback: aggregationStats['Feedback'] || 0,
    Interview: aggregationStats['Interview'] || 0,
    Declined: aggregationStats['Declined'] || 0,
    Aproved: aggregationStats['Aproved'] || 0,
  };

  res.status(200).json({ defaultStats, monthlyApplicationsStats });
};
