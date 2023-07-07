import { fetchJobLoad, fetchJobPageLoad } from '@/reducers/jobReducer';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { useState, useEffect, Fragment } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Loading from './elements/loading';
import JobCard from './JobCard';
import { Link, redirect } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

function JobsContainer() {
  const { jobs, totalJobs, page, isLoading, numOfPages, limit } =
    useAppSelector((store: RootState) => store.jobs);
  const { filteredJobs, isFiltered } = useAppSelector(
    (store: RootState) => store.search,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (jobs) {
      dispatch(fetchJobLoad());
    }
  }, []);

  const jobCardHandler = (id: any) => {
    console.log(id);
  };

  if (jobs.length < 1 && !isLoading) {
    return <h2>No jobs to display</h2>;
  }

  let list, newNumOfPages;
  if ( isFiltered === false) {
    list = jobs;
    newNumOfPages = numOfPages
    // newNumOfPages = Math.ceil(jobs.length / limit);
  } else {
    list = filteredJobs.jobs;
    newNumOfPages = Math.ceil(filteredJobs.jobs.length / limit);
  }
  // console.log("🚀 ~ newNumOfPages:",jobs, limit,newNumOfPages)/

  const handlePageClick = (e: any) => {
    let newPage = e.selected + 1,
      newLimit = 3;

    dispatch(fetchJobPageLoad({ newPage, newLimit }));
  };
  return (
    <div className="m-auto max-w-4xl">
      {isLoading ? (
        <Loading />
      ) : (
        <h2 className="font-semi-bold text-2xl">
         {jobs.length > 1 ? `${jobs.length} Jobs Found` : `${jobs.length} Job Found`}   
        </h2>
      )}
      <div className="grid grid-cols-2 gap-4">
        {console.log(isFiltered)}
        {list?.map((job: any, inx: number) => (
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
      <div className=" flex justify-center">
      <ReactPaginate
        nextLabel="next  >"
        onPageChange={(e) => handlePageClick(e)}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={newNumOfPages}
        previousLabel="< prev"
        pageClassName="page-item"
        pageLinkClassName=" btn btn-sm btn-outline btn-secondary-content bg-transparent"
        previousClassName=""
        previousLinkClassName="join-item btn-outline  btn-sm btn"
        nextClassName="page-item"
        nextLinkClassName="join-item btn-outline  btn-sm btn"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="join gap-1 py-8 justify-center"
        activeClassName=" btn-active"
        renderOnZeroPageCount={null}
      />
    </div>
    </div>
  );
}

export default JobsContainer;
