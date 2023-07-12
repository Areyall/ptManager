import React from 'react';
import Icon from './elements/icon';
import { Link } from 'react-router-dom';
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
  jobCardHandler: any;
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
  jobCardHandler
}: Props) {
  
  return (
    <>
      <div className="w-full relative  p-4 py-7 rounded-md bg-base-300 ">
      <div className=" absolute top-2 text-gray-400 right-3 inline-flex text-center"><Icon size='20px' icon={'date'}/>{updatedAt}</div>
        {/* <div className="w-full "></div> */}
        <div className="flex flex-row ">
          <div className="w-1/3 ">
            <div className="flex m-auto h-[60px] w-[60px] font-bold items-center justify-center rounded-xl bg-accent text-2xl">
              {company.charAt(0)}
            </div>
          </div>
          <div className="w-2/3 flex items-start gap-1  flex-col">

            <div className="text-3xl font-semibold text-base-content"> {position}</div>
            <a href={jobLink} target='_blank' className="link-accent link font-semibold text-xl" rel="noreferrer">
              {company}
            </a>
           
          </div>
        </div>
        <div className="divider"></div> 
        <div className='flex flex-col gap-2'>
          <div className="flex flex-row gap-4">
            <div className="w-1/2 inline-flex"><Icon size='20px' icon={'glob'}/> {jobLocation}</div>
            <div className=" w-1/2 inline-flex"><Icon size='20px' icon={'jobtype'}/> {jobType}</div>
          </div>
          <div className="flex flex-row gap-4">
            <div className=" w-1/2 inline-flex "><Icon size='20px' icon={'plus'}/>Stage: {jobStage}</div> 
            <div className={`   badge ${jobStatus === 'Pending'? 'badge-warning' : jobStatus === 'Connected' ? 'badge-info badge-outline' : 'badge-info'} gap-2 `}> {jobStatus}</div>
          </div>
          
        </div>
        <Link to={`/job/${jobCardHandler}`} className='btn btn-sm  mt-6 btn-neutral btn-outline'>Details</Link>
      </div>
    </>
  );
}

export default JobCard;
