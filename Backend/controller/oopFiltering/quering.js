class JobFilter {
    constructor(queryParams) {
      this.queryParams = queryParams;
    }
  
    applyFilter(jobs) {
      const filteredJobs = jobs.filter((job) => {
        return (
          this.filterByJobStatus(job) &&
          this.filterByJobType(job)
          // Add more filtering conditions if needed
        );
      });
  
      return filteredJobs;
    }
  
    filterByJobStatus(job) {
      const { jobStatus } = this.queryParams;
  
      if (jobStatus && jobStatus !== 'all') {
        return job.jobStatus === jobStatus;
      }
  
      return true;
    }
  
    filterByJobType(job) {
      const { jobType } = this.queryParams;
  
      if (jobType && jobType !== 'all') {
        return job.jobType === jobType;
      }
  
      return true;
    }
  
    // Add more filtering methods as needed
  
  }
  
  // Usage in your route handler
  const queryParams = req.query;
  const jobs = await Job.find();
  
  const jobFilter = new JobFilter(queryParams);
  const filteredJobs = jobFilter.applyFilter(jobs);
  
  res.json(filteredJobs);
  