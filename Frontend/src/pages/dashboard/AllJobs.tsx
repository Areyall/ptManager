import React from 'react';
import SearchContainer from './components/SearchContainer';
import JobsContainer from './components/JobsContainer';

function AllJobs() {
  return (
    <div className="bg-base-200 min-h-screen p-2">
      <div className=" bg-base-200 p-2 m-auto  rounded">
        <SearchContainer />
        <JobsContainer />
      </div>
    </div>
  );
}

export default AllJobs;
