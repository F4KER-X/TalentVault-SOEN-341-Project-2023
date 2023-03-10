const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  jobTitle: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  maxSalary: {
    type: Number,
    required: true
  },
  minSalary: {
    type: Number,
    required: true
  },
  jobDescription: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    required: true
  },
  jobRequirements: {
    //requirements like "must have degree in finance"
    type: String,
    required: true
  },
  jobLocation: {
    province: { type: String, required: true },
    city: { type: String, required: true }
  },
  status: {
    type: String,
    enum: ['Open', 'Closed'],
    default: 'Open'
  }
}, {
  timestamp: true
});

module.exports = mongoose.model("Job", jobSchema);
