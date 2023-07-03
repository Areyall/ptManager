import React from 'react';
import SearchContainer from './components/SearchContainer';
import JobsContainer from './components/JobsContainer';

function AllJobs() {
  return (
    <div className="bg-base-200 p-8">
      <div className=" bg-base-200p-4 m-auto  rounded">
        <SearchContainer />
        <JobsContainer />
      </div>
    </div>
  );
}

export default AllJobs;
