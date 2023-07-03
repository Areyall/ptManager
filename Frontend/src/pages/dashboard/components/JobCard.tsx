import React from 'react';
interface Props {
  company: String;
  updatedAt: String;
}

// company: 'Deta';
// createdAt: '2023-07-03T09:22:55.407Z';
// createdBy: '649c8cfea070c767c6cc0f31';
// jobLocation: 'Kyiv';
// jobStage: '1st';
// jobStatus: 'Connected';
// jobType: 'Part-time';
// position: 'Ass';
// status: 'Pending';
// updatedAt: '2023-07-03T09:22:55.407Z';

function JobCard({ company,updatedAt }: Props) {
  return (
    <>
      <div className="w-1/2 ">
        <div className="w-full ">{company}</div>
        <div className="w-full ">{updatedAt}</div>
      </div>
    </>
  );
}

export default JobCard;
