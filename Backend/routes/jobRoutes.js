const express = require('express');
const {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  showStatsJob,
} = require('../controller/jobController');
const router = express.Router();

router.route('/job/').post(createJob).get(getAllJobs);
// router.route('/job/deleteJob')
// router.route('/job/getAllJobs')
router.route('/job/stat').get(showStatsJob);
router.route('/job/:id').delete(deleteJob).put(updateJob);

module.exports = router;
