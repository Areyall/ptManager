import { useState, useEffect } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SearchInputs } from './elements/inputs';
import {
  clearFilter,
  fetchJobLoad,
  fetchJobSearch,
  handleChange,
  handleSearch,
} from '@/reducers/jobReducer';

type FormValues = {
  search: string;
  sort: string;
  jobType: string;
  jobStatus: string;
  jobStage: string;
};

// sortOptions: string[];
// typeOptions: string[];
// stageOptions: string[];
// statusOptions: string[];

function SearchContainer() {
  const {
    sortOptions,
    typeOptions,
    stageOptions,
    statusOptions,
    jobType,
    jobStatus,
    jobStage,
    sort,
    isLoading,
  } = useAppSelector((store: RootState) => store.search);
  const { page, limit } = useAppSelector((store: RootState) => store.jobs);

  const [newSearch, setNewSearch] = useState('');
  const [newsearchStatus, setNewsearchStatus] = useState('');
  const [fieldNewStatus, setFieldNewStatus] = useState('');
  const [newSort, setNewSort] = useState(sort);
  const [newType, setNewType] = useState(jobType);
  const [newStatus, setNewStatus] = useState(jobStatus);
  const [newStage, setNewStage] = useState(jobStage);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const dispatch = useAppDispatch();

  const handleChanges = (e: any) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const onClearSubmit: SubmitHandler<FormValues> = async (e: any) => {
    e.preventDefault;
    reset();
    setNewSearch('');
    dispatch(clearFilter());
    dispatch(fetchJobLoad());
  };
  let search = newSearch;
  const onSubmit: SubmitHandler<FormValues> = async (e: any, data: any) => {
    e.preventDefault;
    // const fData = watch(data);

    let newPage = page;
    dispatch(handleSearch({ search }));
    dispatch(
      fetchJobSearch({
        jobType,
        jobStatus,
        jobStage,
        sort,
        search,
        newPage,
        limit,
      }),
    );

    // dispatch(fetchCreateJob({ ...fData, createdBy: user?._id }))
    // console.log("🚀 ~ {...fData,createdBy:user?._id}:", {...fData,createdBy:user?._id})
  };

  return (
    <div className="  rounded-md  p-2 flex justify-center ">
      {/* <h1 className="text-lg">Search for application</h1> */}
      <div className="flex flex-row justify-center ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col flex-wrap items-center gap-4"
        >
          <div className='flex-row flex items-end  gap-4'>
            <div>
              <SearchInputs
                title="search"
                value={newSearch}
                type="search"
                register={register}
                label="search"
                onChange={(e: any) => setNewSearch(e.target.value)}
                required={false}
              />
            </div>
            <button
            disabled={isLoading}
            type="submit"
            className=" btn-outline btn-sm justify-center btn  m-1
               min-w-[100px] max-w-[210px] rounded-none"
          >
            Search
          </button>
          <button
        disabled={isLoading}
        type="button"
        className=" btn-outline btn-sm justify-center btn m-1
               min-w-[100px] max-w-[210px] rounded-none"
        onClick={(e: any) => onClearSubmit(e)}
      >
        Clear
      </button>
          </div>
<div className='flex flex-row gap-4'>
  
            <div>
              <h2>Sort:</h2>
              <select
                className="mt-0 block
                   w-full p-1
                 min-w-[100px]
                 border-0
                 border-b-2
                 border-base-300 bg-base-100 px-0.5 pl-3
                 focus:border-black focus:ring-0"
                {...register('sort', { required: true })}
                onChange={(e) => handleChanges(e)}
              >
                {sortOptions.map((item: any, inx: any) => (
                  <option key={inx} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <h2>Job Type:</h2>
              <select
                className="mt-0 block
                   w-full
                 p-1
                 min-w-[100px]
                 border-0
                 border-b-2
                 border-base-300 bg-base-100 px-0.5 pl-3
                 focus:border-black focus:ring-0"
                {...register('jobType', { required: true })}
                onChange={(e) => handleChanges(e)}
              >
                {['all', ...typeOptions].map((item, inx) => (
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
                 p-1
                 min-w-[100px]
                 border-0
                 border-b-2
                 border-base-300 bg-base-100 px-0.5 pl-3
                 focus:border-black focus:ring-0"
                {...register('jobStatus')}
                onChange={(e) => handleChanges(e)}
              >
                {['all', ...statusOptions].map((item, inx) => (
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
                 p-1
                 min-w-[100px]
                 border-0
                 border-b-2
                 border-base-300 bg-base-100 px-0.5 pl-3
                 focus:border-black focus:ring-0"
                {...register('jobStage')}
                onChange={(e) => handleChanges(e)}
              >
                {['all', ...stageOptions].map((item, inx) => (
                  <option key={inx} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
  
</div>
          {/* <input type="reset" value="Reset"></input> */}
        </form>
      </div>
      
    </div>
  );
}

export default SearchContainer;
