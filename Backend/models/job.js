const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema(
  {
    company: {
      type: String,
      required: [true, 'provide company'],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, 'provide position'],
      maxlength: 50,
    },
    jobStatus: {
      type: String,
      enum: [
        'Connected',
        'Pending',
        'Feedback',
        'Interview',
        'Declined',
        'Aproved',
      ],
      default: 'Connected',
    },
    jobType: {
      type: String,
      enum: ['Internship', 'Remote', 'Part-time', 'Full-time'],
      default: 'Part-time',
    },
    jobStage: {
      type: String,
      enum: ['1st', '2nd', '3rd', 'Deep'],
      default: '1st',
    },
    jobLocation: {
      type: String,
      default: 'Kyiv',
      maxlength: 50,
    },
    jobConnectionDate: {
      type: String,
      maxlength: 50,
    },
    jobComment: {
      type: String,
      maxlength: 1550,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
