import { fetchJobLoad } from '@/reducers/jobReducer';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { useState, useEffect, Fragment } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Loading from './elements/loading';
import JobCard from './JobCard';
import { Link, redirect } from 'react-router-dom';

function JobsContainer() {
  const { jobs, totalJobs, page, isLoading, numOfPages } = useAppSelector(
    (store: RootState) => store.jobs,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (jobs) {
      dispatch(fetchJobLoad());
    }
  }, []);

  const jobCardHandler = (id:any) => {
    
    console.log(id)
  }

  if (jobs.length < 1) {
    return <h2>No jobs to display</h2>;
  }
  return (
    <div className='max-w-4xl m-auto'>
      {isLoading ? <Loading /> : <h2 className='text-2xl font-semi-bold'>{totalJobs} Jobs Found</h2>}
      <div className="grid grid-cols-2 gap-4">
        {jobs?.map((job: any, inx: number) => (
          <JobCard
            key={job._id}
            company={jobs[inx].company}
            updatedAt={jobs[inx].updatedAt.slice(0, 10)}
            jobLink={jobs[inx].jobLink}
            status={jobs[inx].status}
            position={jobs[inx].position}
            jobType={jobs[inx].jobType}
            jobStatus={jobs[inx].jobStatus}
            jobStage={jobs[inx].jobStage}
            jobLocation={jobs[inx].jobLocation}
            jobCardHandler={jobs[inx]._id}
          />
        ))}
      </div>
    </div>
  );
}

export default JobsContainer;
