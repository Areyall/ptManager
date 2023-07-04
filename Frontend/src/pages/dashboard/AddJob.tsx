import { fetchCreateJob } from '@/reducers/jobReducer';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Inputs from './components/elements/inputs';

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

function AddJob() {
  const { job } = useAppSelector((store: RootState) => store.job);
  const { user } = useAppSelector((store: RootState) => store.user);
  

  const [newCompany, setNewCompany] = useState(job?.company || '');
  const [newPosition, setNewPosition] = useState(job?.position || '');
  const [newType, setNewType] = useState('Part-time');
  const [newStatus, setNewStatus] = useState('');
  const [newStage, setNewStage] = useState('');
  const [newLocation, setNewLocation] = useState(job?.jobLocation || '');
  const [newDate, setNewDate] = useState(job?.jobConnectionDate || '');
  const [newComment, setNewComment] = useState(job?.jobComment || '');
  const [newLink, setNewLink] = useState('/');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormValues> = async (e: any, data: any) => {
    e.preventDefault;
    const fData = watch(data);

    dispatch(fetchCreateJob({...fData,createdBy:user?._id}));
    // console.log("🚀 ~ {...fData,createdBy:user?._id}:", {...fData,createdBy:user?._id})
  };
  return (
    <>
      <div className="bg-base-200 p-8">
        <div className=" bg-base-200p-4 m-auto max-w-2xl rounded">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <h1 className="text-3xl">New Application</h1>
            <div className=" grid grid-cols-2 grid-rows-1   gap-8">
              {/* <div>
                <h2>Company:</h2>
                <input
                  className="formMain"
                  type="text"
                  value={newCompany}
                  {...register('company', {
                    onChange: (e) => setNewCompany(e.target.value),
                    required: true,
                  })}
                  // placeholder={newName}
                />
              </div> */}
              <div>
                <Inputs
                  title="Company"
                  value={newCompany}
                  type="text"
                  register={register}
                  label="company"
                  onChange={(e: any) => setNewCompany(e.target.value)}
                  required={true}
                />
              </div>
              <div>
                <Inputs
                  title="Position"
                  value={newPosition}
                  type="text"
                  register={register}
                  label="position"
                  onChange={(e: any) => setNewPosition(e.target.value)}
                  required={true}
                />
              </div>
              <div>
                <Inputs
                  title="Location"
                  value={newLocation}
                  type="text"
                  register={register}
                  label="jobLocation"
                  onChange={(e: any) => setNewLocation(e.target.value)}
                  required={false}
                />
              </div>
              <div>
                <Inputs
                  title="Date"
                  value={newDate}
                  type="text"
                  register={register}
                  label="jobConnectionDate"
                  onChange={(e: any) => setNewDate(e.target.value)}
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
                  onChange={(e) => setNewType(e.target.value)}
                >
                  {['Internship', 'Remote', 'Part-time', 'Full-time'].map(
                    (item, inx) => (
                      <option key={inx} value={item}>
                        {item}
                      </option>
                    ),
                  )}
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
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  {[
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
                  onChange={(e) => setNewStage(e.target.value)}
                >
                  {['1st', '2nd', '3rd', 'Deep'].map((item, inx) => (
                    <option key={inx} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Inputs
                  title="Link"
                  value={newLink}
                  type="text"
                  register={register}
                  label="jobLink"
                  onChange={(e: any) => setNewLink(e.target.value)}
                  required={false}
                />
              </div>

              <div></div>
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
                  value={newComment}
                  {...register('jobComment')}
                  onChange={(e) => setNewComment(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className=" btn-outline btn m-auto min-w-[150px] max-w-[210px] rounded-none"
            >
              Submit
            </button>
          </form>
        </div>
            <button
            disabled={true}
              type="button"
              className=" btn-outline btn m-auto min-w-[150px] max-w-[210px] rounded-none"
            >
              Clear
            </button>
      </div>
    </>
  );
}

export default AddJob;
