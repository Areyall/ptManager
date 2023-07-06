import { useState, useEffect } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SearchInputs } from './elements/inputs';
import { clearFilter, handleChange } from '@/reducers/jobReducer';

type FormValues = {
  search: string;
  jobSort: string;
  searchType: string;
  searchStatus: string;
  searchStage: string;
};

// sortOptions: string[];
// typeOptions: string[];
// stageOptions: string[];
// statusOptions: string[];

function SearchContainer() {
  const { sortOptions, typeOptions, stageOptions, statusOptions, searchType,searchStatus,searchStage,sort,search } = useAppSelector((store: RootState) => store.search);

  const [newSearch, setNewSearch] = useState(search);
  const [newsearchStatus, setNewsearchStatus] = useState('');
  const [fieldNewStatus, setFieldNewStatus] = useState('');
  const [newSort, setNewSort] = useState(sort);
  console.log("🚀 ~ newSort:", newSort)
  const [newType, setNewType] = useState(searchType);
  const [newStatus, setNewStatus] = useState(searchStatus);
  const [newStage, setNewStage] = useState(searchStage);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const dispatch = useAppDispatch();

const handleChanges=(e:any)=>{
  
  dispatch(handleChange({name: e.target.name,value:e.target.value}))
}

  const onClearSubmit: SubmitHandler<FormValues> = async (e: any) => {
    e.preventDefault;
    reset()
    setNewSearch('')
    dispatch(clearFilter())
  };
  const onSubmit: SubmitHandler<FormValues> = async (e: any, data: any) => {
    e.preventDefault;
    const fData = watch(data);

    // dispatch(fetchCreateJob({ ...fData, createdBy: user?._id }));
    // console.log("🚀 ~ {...fData,createdBy:user?._id}:", {...fData,createdBy:user?._id})
  };

  return (
    <div className="m-auto  rounded-md bg-base-300 p-8">
      <h1 className="text-lg">Search for application</h1>
      <div className="flex flex-row justify-between">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-row flex-wrap gap-4"
        >
          <div>
            <SearchInputs
              title="search"
              value={newSearch}
              type="search"
              register={register}
              label="search"
              onChange={(e: any) => setNewSearch(e.target.value)}
              required={true}
            />
          </div>
       
          <div>
            <h2>Sort:</h2>
            <select
              className="mt-0 block
                 w-full
               min-w-[150px]
               border-0
               border-b-2
               border-base-300 bg-base-100 px-0.5 pl-3
               focus:border-black focus:ring-0"
              {...register('jobSort', { required: true })}
              onChange={(e) => handleChanges(e)}
            >
              {sortOptions.map((item:any, inx:any) => (
                <option key={inx} value={ item }>
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
               min-w-[150px]
               border-0
               border-b-2
               border-base-300 bg-base-100 px-0.5 pl-3
               focus:border-black focus:ring-0"
              {...register('searchType', { required: true })}
              onChange={(e) => handleChanges(e)}
            >
              {['all',...typeOptions].map((item, inx) => (
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
               min-w-[150px]
               border-0
               border-b-2
               border-base-300 bg-base-100 px-0.5 pl-3
               focus:border-black focus:ring-0"
              {...register('searchStatus')}
              onChange={(e) => handleChanges(e)}
            >
              {['all',...stageOptions].map((item, inx) => (
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
               min-w-[150px]
               border-0
               border-b-2
               border-base-300 bg-base-100 px-0.5 pl-3
               focus:border-black focus:ring-0"
              {...register('searchStage')}
              onChange={(e) => handleChanges(e)}
            >
              {['all',...statusOptions].map((item, inx) => (
                <option key={inx} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <button
            // disabled={isLoading}
            type="submit"
            className=" btn-outline btn m-auto min-w-[150px] max-w-[210px] rounded-none"
          >
            Search
          </button>
        </form>
      </div>
      <button
        // disabled={isLoading}
        type="button"
        className=" btn-outline btn m-auto min-w-[150px] max-w-[210px] rounded-none"
        onClick={(e: any) => onClearSubmit(e)}
      >
        Clear
      </button>
    </div>
  );
}

export default SearchContainer;
