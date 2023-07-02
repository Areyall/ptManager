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
    status: {
      type: String,
      enum: ['connected', 'pending', 'feedback', 'interview', 'declined'],
      default: 'connected',
    },
    jobType: {
      type: String,
      enum: ['internship', 'remote', 'part-time', 'full-time'],
      default: 'part-time',
    },
    jobLocation: {
      type: String,
      default: 'Kyiv',
      maxlength: 50,
    },
    connectionDate: {
      type: String,
      maxlength: 50,
    },
    jobComment: {
      type: String,
      maxlength: 550,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;