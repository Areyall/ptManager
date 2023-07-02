import { fetchJob } from '@/reducers/jobReducer';
import { fetchUserUpdate } from '@/reducers/userReducer';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormValues = {
  company: string;
  position: string;
  type: string;
  status: string;
  location: string;
  date: string;
  comment: string;
};

function AddJob() {
  const { job } = useAppSelector((store: RootState) => store.job);

  const [newCompany, setNewCompany] = useState(job?.company || '');
  const [newPosition, setNewPosition] = useState(job?.position || '');
  const [newType, setNewType] = useState(job!.type);
  const [newStatus, setNewStatus] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newComment, setNewComment] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  console.log('🚀 ~ data:', job);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormValues> = async (e: any, data: any) => {
    e.preventDefault;
    const fData = watch(data);
    dispatch(fetchJob(fData));
  };
  return (
    <>
      <div className="bg-base-200 p-8">
        <div className=" bg-base-200p-4 m-auto max-w-2xl rounded">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <h1 className="text-3xl">Profile</h1>
            <div className=" grid grid-cols-3   gap-8">
              <div>
                Company:
                <input
                  type="text"
                  value={newCompany}
                  {...register('company', {
                    onChange: (e) => setNewCompany(e.target.value),
                    required: true,
                  })}
                  // placeholder={newName}
                />
              </div>
              <div>
                Position:
                <input
                  type="text"
                  value={newPosition}
                  {...register('position', {
                    onChange: (e) => setNewPosition(e.target.value),
                    required: true,
                  })}
                  // placeholder={newEmail}
                />
              </div>
              <div>
                <h1>Job Type:</h1>
                <select
                  {...register('type', { required: true })}
                  defaultValue={job!.type[0]} // Set the initial selected value
                  onChange={(e) => setNewType([e.target.value])} // Handle selection change
                >
                  {job!.type?.map((item, inx) => (
                    <option key={inx} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button type="submit" className="btn-outline btn max-w-[210px]">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddJob;
