import React from 'react';
interface Props {
  company: string;
  updatedAt: string;
  jobLink: string;
  status: string;
  position: string;
  jobType: string;
  jobStatus: string;
  jobStage: string;
  jobLocation: string;
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
// jobLink : "https://aykyiv.vercel.app/"

function JobCard({
  company,
  updatedAt,
  jobLink,
  position,
  jobType,
  jobStatus,
  jobStage,
  jobLocation,
}: Props) {
  return (
    <>
      <div className="w-full relative  p-4 py-7 rounded-md bg-base-300 ">
      <div className=" absolute top-2 text-gray-400 right-3">{updatedAt}</div>
        {/* <div className="w-full "></div> */}
        <div className="flex flex-row ">
          <div className="w-1/3 ">
            <div className="flex m-auto h-[60px] w-[60px]  items-center justify-center rounded-xl bg-accent text-2xl">
              {company.charAt(0)}
            </div>
          </div>
          <div className="w-2/3 flex items-center gap-1  flex-col">
            <a href={jobLink} className="link-accent link text-3xl font-semibold">
              {company}
            </a>
            <div className=" badge block badge-warning gap-2"> {jobStatus}</div>
          </div>
        </div>
        <div className="divider"></div> 
        <div>
          <div className="flex flex-row gap-4">
            <div className="w-1/2 ">Location: {jobLocation}</div>
            <div className=" w-1/2">Type: {jobType}</div>
          </div>
          <div className="flex flex-row gap-4">
            <div className=" w-1/2">Stage: {jobStage}</div>
            <div className=" w-1/2">Position: {position}</div>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default JobCard;
