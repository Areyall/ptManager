import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  clearStatus,
  fetchDeleteJob,
  fetchEditJob,
  fetchJobDetails,
  reloadStatus,
} from '@/reducers/jobReducer';
import Loading from '../elements/loading';
import EditJob from './Elements/EditJob';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

declare global {
  interface Window {
    modalEdit: any;
    modalDelete: any;
  }
}

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

interface Params {
  jobId: string;
}

function MainTaskPage() {
  // const data = useAppSelector(store => store)

  const { singleJobInfo, isLoading, status, editStatus } = useAppSelector(
    (store: RootState) => store.singleJob,
  );

  const { jobId } = useParams<keyof Params>() as Params;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [updateCompany, setUpdateCompany] = useState('');
  // const [updatePosition, setUpdatePosition] = useState('');
  // const [updateType, setUpdateType] = useState('');
  // const [updateStatus, setUpdateStatus] = useState('');
  // const [updateStage, setUpdateStage] = useState('');
  // const [updateLocation, setUpdateLocation] = useState('');
  // const [updateDate, setUpdateDate] = useState('');
  // const [updateComment, setUpdateComment] = useState('');
  // const [updateLink, setUpdateLink] = useState('/');
  const [newTriger, setnewTriger] = useState(false);

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

    // dispatch(fetchCreateJob({ ...fData, createdBy: user?._id }));
    // console.log("🚀 ~ {...fData,createdBy:user?._id}:", {...fData,createdBy:user?._id})
  };

  const deleteJobHandler = (e: any) => {
    e.preventDefault;

    dispatch(fetchDeleteJob(jobId));

    navigate('/alljobs');
  };

  useEffect(() => {
    dispatch(fetchJobDetails(jobId));

    if (status === 'success') {
      dispatch(clearStatus(''));
    }
  }, []);

  useEffect(() => {
    if (editStatus === 'success') {
      dispatch(fetchJobDetails(jobId));
      dispatch(reloadStatus(''));
      toast.success('Job updated successfully');
    }
  }, [editStatus]);

  return (
    <>
      <div className=" flex w-full flex-col items-end gap-1 p-4">
        <h1 className=" text-2xl">Application Details</h1>
        <div className="flex gap-4">
          <button
            className="btn-outline btn-warning btn-sm btn"
            onClick={() => {
              setnewTriger(true);
              window.modalEdit.showModal();
            }}
          >
            Update
          </button>
          <button
            className="btn-neutral btn-outline btn-sm btn"
            onClick={() => window.modalDelete.showModal()}
          >
            Delete
          </button>
        </div>
      </div>
      <div className=" m-auto flex  max-w-[900px] flex-col items-start justify-center gap-4 md:flex-row">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="flex flex-col gap-8 md:w-1/2">
            <div className="">
              <div className=" grid w-full  grid-cols-1 justify-between gap-4 md:grid-cols-3">
                <div>
                  <h2 className="text-sm text-neutral-300">Company</h2>
                  <p className=" text-xl text-accent-content">
                    {singleJobInfo.company}
                  </p>
                </div>
                <div>
                  <h2 className="text-sm text-neutral-300">Connection date</h2>
                  <p className=" text-xl text-accent-content">
                    {singleJobInfo.jobConnectionDate}
                  </p>
                </div>
                <div>
                  <h2 className="text-sm text-neutral-300">Job type</h2>
                  <p className=" text-xl text-accent-content">
                    {singleJobInfo.jobType}
                  </p>
                </div>
                <div>
                  <h2 className="text-sm text-neutral-300">Position</h2>
                  <p
                    className={`${
                      singleJobInfo.position === 'Connected'
                        ? 'text-warning'
                        : 'text-info'
                    } text-xl `}
                  >
                    {singleJobInfo.position}
                  </p>
                </div>

                <div>
                  <h2 className="text-sm text-neutral-300">Job Location</h2>
                  <p className=" text-xl text-accent-content">
                    {singleJobInfo.jobLocation}
                  </p>
                </div>
                <div>
                  <h2 className="text-sm text-neutral-300">Current stage</h2>
                  <p
                    className={`${
                      singleJobInfo.position === 'Connected'
                        ? 'text-warning'
                        : 'text-info'
                    } text-xl `}
                  >
                    {singleJobInfo.jobStage}
                  </p>
                </div>
                <div>
                  <h2 className="text-sm text-neutral-300">Curent status</h2>
                  <p
                    className={`${
                      singleJobInfo.jobStatus === 'Connected'
                        ? 'text-warning'
                        : singleJobInfo.jobStatus === 'Interview'
                        ? 'text-accent'
                        : singleJobInfo.jobStatus === 'Declined'
                        ? 'text-error'
                        : 'text-info'
                    } text-xl `}
                  >
                    {singleJobInfo.jobStatus}
                  </p>
                </div>
              </div>
            </div>
            {singleJobInfo.jobLink !== '' ? (
              <div>
                <h2 className="text-sm text-neutral-300">Company web page</h2>
                <p className=" text-xl text-accent-content">
                  {singleJobInfo.jobLink}
                </p>
              </div>
            ) : null}
            <div>
              <h2 className="text-sm text-neutral-300">Description</h2>
              <p className="text-lg text-accent-content">
                {singleJobInfo.jobComment}
              </p>
            </div>
          </div>
        )}
        <div className=" max-w-sm md:w-1/2">
          <img src="https://i.imgur.com/4zwGfh8.jpeg" alt="img" className="" />
        </div>
        {/* <div className="flex flex-row gap-4 p-2">
          <button
            className="btn-outline btn-warning btn-md btn"
            onClick={() => window.modalEdit.showModal()}
          >
            Edit
          </button>
          <button
            className="btn-outline btn-error btn-md btn"
            onClick={() => window.modalDelete.showModal()}
          >
            Delete
          </button>
        </div> */}
      </div>
      <dialog id="modalEdit" className="modal">
        <EditJob
          cJobId={jobId}
          singleJobInfo={singleJobInfo}
          triger={newTriger}
        />
      </dialog>
      <dialog id="modalDelete" className="modal">
        <form method="dialog" className="modal-box">
          <button className="btn-ghost btn-sm btn-circle btn absolute right-2 top-2">
            ✕
          </button>
          <h3 className="text-lg font-bold text-error">DELETING JOB!</h3>
          <p className="py-4 text-error">Are you sure?</p>
          <div className="flex w-full justify-center">
            <button
              className="btn-xl btn-outline btn-error btn"
              onClick={(e) => deleteJobHandler(e)}
            >
              Delete
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}

export default MainTaskPage;
