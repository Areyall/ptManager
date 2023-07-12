import { RootState, useAppDispatch, useAppSelector } from '@/store';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Inputs } from '../../elements/inputs';
import { fetchJobDetails } from '@/reducers/jobReducer';

type FormValues = {
  company: string;
  position: string;
  jobType: string;
  jobStatus: string;
  jobStage: string;
  jobLocation: string;
  jobLink: string;
  jobConnectionDate: string;
  jobComment: string;
};

interface CotProps {
  cJobId: string;
  triger: boolean;
  singleJobInfo: any;
}

function EditJob({ cJobId,singleJobInfo, triger = false }: CotProps) {
console.log("🚀 ~ triger:", triger)


  const [updateCompany, setUpdateCompany] = useState(singleJobInfo.company);
  const [updatePosition, setUpdatePosition] = useState(
    singleJobInfo?.position || '',
  );
  const [updateType, setUpdateType] = useState(
    singleJobInfo?.jobType || 'Part-time',
  );
  const [updateStatus, setUpdateStatus] = useState(
    singleJobInfo?.jobStatus || '',
  );
  const [updateStage, setUpdateStage] = useState(singleJobInfo?.jobStage || '');
  const [updateLocation, setUpdateLocation] = useState(
    singleJobInfo?.jobLocation || '',
  );
  const [updateDate, setUpdateDate] = useState(
    singleJobInfo?.jobConnectionDate || '',
  );
  const [updateComment, setUpdateComment] = useState(
    singleJobInfo?.jobComment || '',
  );
  const [updateLink, setUpdateLink] = useState(singleJobInfo?.jobLink || '/');
  
//   const [newTrigger, setnewTrigger] = useState(false);
//   setnewTrigger(triger)
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (e: any, data: any) => {
    e.preventDefault;
    const fData = watch(data);
    console.log("🚀 ~ fData:", fData)

    // dispatch(fetchCreateJob({ ...fData, createdBy: user?._id }));
    // console.log("🚀 ~ {...fData,createdBy:user?._id}:", {...fData,createdBy:user?._id})
  };
  useEffect(() => {
    setUpdateCompany(singleJobInfo.company);
    setUpdatePosition(singleJobInfo?.position);
    setUpdateType(singleJobInfo?.jobType);
    setUpdateStatus(singleJobInfo?.jobStatus);
    setUpdateStage(singleJobInfo?.jobStage);
    setUpdateLocation(singleJobInfo?.jobLocation);
    setUpdateDate(singleJobInfo?.jobConnectionDate);
    setUpdateComment(singleJobInfo?.jobComment);
    setUpdateLink(singleJobInfo?.jobLink);

    setValue("company", singleJobInfo.company)
    setValue("position", singleJobInfo.position)
    setValue("jobType", singleJobInfo.jobType)
    setValue("jobStatus", singleJobInfo.jobStatus)
    setValue("jobStage", singleJobInfo.jobStage)
    setValue("jobLocation", singleJobInfo.jobLocation)
    setValue("jobConnectionDate", singleJobInfo.jobConnectionDate)
    setValue("jobComment", singleJobInfo.jobComment)
    setValue("jobLink", singleJobInfo.jobLink)

  }, [triger]);

  return (
    <>
      <div className="modal-box">
        <button
          onClick={() => window.modalEdit.close()}
          className="btn-ghost btn-sm btn-circle btn absolute right-2 top-2"
        >
          ✕
        </button>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <h1 className="text-3xl">Update Application</h1>
          <div>
            <Inputs
              title="Company"
              value={updateCompany}
              type="text"
              register={register}
              label="company"
              onChange={(e: any) => setUpdateCompany(e.target.value)}
              required={true}
            />
          </div>
          <div>
            <Inputs
              title="Position"
              value={updatePosition}
              type="text"
              register={register}
              label="position"
              onChange={(e: any) => setUpdatePosition(e.target.value)}
              required={true}
            />
          </div>
          <div>
            <Inputs
              title="Location"
              value={updateLocation}
              type="text"
              register={register}
              label="jobLocation"
              onChange={(e: any) => setUpdateLocation(e.target.value)}
              required={false}
            />
          </div>
          <div>
            <Inputs
              title="Date"
              value={updateDate}
              type="text"
              register={register}
              label="jobConnectionDate"
              onChange={(e: any) => setUpdateDate(e.target.value)}
              required={false}
            />
          </div>
          <div>
            <h2>Job Type:</h2>
            <select
              className="mt-0 block
                 w-full
               border-0
               border-b-2
               border-base-300
               bg-base-100 px-0.5 pl-3
               focus:border-black focus:ring-0"
              {...register('jobType', { required: true })}
              onChange={(e) => setUpdateType(e.target.value)}
            >
              {[
                updateType,
                'Internship',
                'Remote',
                'Part-time',
                'Full-time',
              ].map((item, inx) => (
                <option key={inx} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h2>Status:</h2>
            <select
              className="mt-0
                 block w-full
               border-0
               border-b-2
               border-base-300
               bg-base-100 px-0.5 pl-3
               focus:border-black focus:ring-0"
              {...register('jobStatus')}
              onChange={(e) => setUpdateStatus(e.target.value)}
            >
              {[
                updateStatus,
                'Connected',
                'Pending',
                'Feedback',
                'Interview',
                'Declined',
                'Aproved',
              ].map((item, inx) => (
                <option key={inx} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h1>Stage:</h1>
            <select
              className="mt-0
                 block w-full
               border-0
               border-b-2
               border-base-300
               bg-base-100 px-0.5 pl-3
               focus:border-black focus:ring-0"
              {...register('jobStage')}
              onChange={(e) => setUpdateStage(e.target.value)}
            >
              {[updateStage, '1st', '2nd', '3rd', 'Deep'].map((item, inx) => (
                <option key={inx} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Inputs
              title="Link"
              value={updateLink}
              type="text"
              register={register}
              label="jobLink"
              onChange={(e: any) => setUpdateLink(e.target.value)}
              required={false}
            />
          </div>
          <div className=" col-span-2 m-auto">
            <h2>Comment:</h2>
            <textarea
              className="m-auto mt-0
                 block w-full
               border-0
               border-b-2
               border-base-300
               bg-base-100 px-0.5 pl-3
               focus:border-black focus:ring-0"
              cols={60}
              rows={10}
              value={updateComment}
              {...register('jobComment')}
              onChange={(e) => setUpdateComment(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className=" btn-outline btn m-auto min-w-[150px] max-w-[210px] rounded-none"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default EditJob;
