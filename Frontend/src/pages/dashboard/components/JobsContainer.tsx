import { fetchJobLoad } from '@/reducers/jobReducer';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { useState, useEffect, Fragment } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Loading from './elements/loading';
import JobCard from './JobCard';

function JobsContainer() {
  const { jobs, totalJobs, page, isLoading, numOfPages } = useAppSelector(
    (store: RootState) => store.jobs,
  );
  console.log('🚀 ~ jobs:', jobs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (jobs) {
      dispatch(fetchJobLoad());
    }
  }, []);

  if (jobs.length < 1) {
    return <h2>No jobs to display</h2>;
  }
  return (
    <div>
      {isLoading ? <Loading /> : `${totalJobs} Jobs Found`}
      <div className="grid grid-cols-2">
        {jobs?.map((job: any, inx: number) => (
          <JobCard
            key={job._id}
            company={jobs[inx].company}
            updatedAt={jobs[inx].updatedAt.slice(0, 10)}
          />
        ))}
      </div>
    </div>
  );
}

export default JobsContainer;
