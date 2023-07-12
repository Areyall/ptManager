import customAxiosFetch from '@/utils/axiosBaseUrl';
import { createAsyncThunk, createAction, createSlice } from '@reduxjs/toolkit';

// import axios from 'axios'

const fetchJobAction = createAction('job/jobDetails');
const fetchJobLoadAction = createAction('jobs/allJobs');
const fetchSingleJobAction = createAction('singleJob/singleJob');
const fetchJobPageAction = createAction('jobs/pageJobs');
const jobsStatsAction = createAction('jobsStats/allStats');
const jobsSearchAction = createAction('jobsSearch/allSearch');

export const fetchCreateJob = createAsyncThunk(
  fetchJobAction as unknown as string,
  async (fData: object, thunkApi) => {
    // const link = `${customAxiosFetch}/user`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await customAxiosFetch.post('/job', fData, config);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

interface Job {
  company: string;
  position: string;
  jobType: string;
  jobStatus: string;
  jobStage: string;
  jobLocation: string;
  jobLink: string;
  jobConnectionDate: string;
  jobComment: string;
}

interface jobSliceState {
  isEditing: boolean;
  job: Job | null;
  status: string | null;
}

const JOB_INITIAL_STATE: jobSliceState = {
  isEditing: false,
  job: {
    company: '',
    position: '',
    jobType: '',
    jobStatus: '',
    jobStage: '',
    jobLocation: '',
    jobLink: '',
    jobConnectionDate: '',
    jobComment: '',
  },
  status: null
};

export const jobSlice = createSlice({
  name: 'job',
  initialState: JOB_INITIAL_STATE,
  reducers: {
      clearStatusField: (state) => {
        state.status = null;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateJob.pending, (state, _action) => {
        state.isEditing = false;
        // state.isAuthenticated = false;
      })
      .addCase(fetchCreateJob.fulfilled, (state, action) => {
        // state.isEditing = true;
        state.job = action.payload.job;
        state.status = 'success';
        
      })
      .addCase(fetchCreateJob.rejected, (state, action) => {
        // state.isEditing = false;
        state.status = 'error';
        state.isEditing = false;
        state.job = null;
        // state.error = action.payload;
      });
  },
});

export const fetchJobLoad = createAsyncThunk(
  fetchJobLoadAction as unknown as string,
  async () => {
    const response = await customAxiosFetch.get('/job');
    return response.data;
  },
);
interface jpProps {
  newPage: number;
  // newLimit: number;
}
// export const fetchJobPageLoad = createAsyncThunk(
//   fetchJobPageAction as unknown as string,
//   async ({ newPage }: jpProps) => {
//     let url = '/job?';

//     if (newPage ) {
//       url = url + `page=${newPage}`;
//     }

//     const response = await customAxiosFetch.get(url);
//     return response.data;
//   },
// );

export const fetchJobSearch = createAsyncThunk(
  jobsSearchAction as unknown as string,
  async ({ jobType, jobStatus, jobStage, sort, search, newPage }: any,thunkApi) => {
    let url = `/job?page=${newPage}&jobStatus=${jobStatus}&jobType=${jobType}&jobStage=${jobStage}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }

    const response = await customAxiosFetch.get(url);
    return response.data;
  },
);

interface allJobsSliceState {
  jobs: any;
  isLoading: boolean;
  isFiltered: boolean;
  totalJobs: number;
  page: number;
  limit: number;
  numberOfPages: number;
}

const ALL_JOBS: allJobsSliceState = {
  jobs: [],
  isLoading: true,
  totalJobs: 0,
  page: 1,
  limit: 2,
  numberOfPages: 1,
  isFiltered: false,
};
export const jobsAll = createSlice({
  name: 'jobs',
  initialState: ALL_JOBS,
  reducers: {
    //   InitialLoading: (state, action) => {
    //     state.isAuthenticated = action.payload;
    //   },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobLoad.pending, (state, _action) => {
        state.isLoading = true;
        // state.isAuthenticated = false;
      })
      .addCase(fetchJobLoad.fulfilled, (state, action) => {
        // state.isEditing = true;
        state.jobs = action.payload.jobs;
        state.totalJobs = action.payload.totalJobs;
        state.isLoading = false;
        state.numberOfPages = action.payload.numberOfPages;
        state.limit = action.payload.limit;
      })
      .addCase(fetchJobLoad.rejected, (state, action) => {
        // state.isEditing = false;
        // state.isEditing = false;
        state.jobs = [];
        state.isLoading = false;
        // state.error = action.payload;
      });
    // builder
    //   .addCase(fetchJobPageLoad.pending, (state, _action) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(fetchJobPageLoad.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.jobs = action.payload.jobs;
    //     state.limit = action.payload.limit;
    //     state.page = action.payload.page;
    //   })
    //   .addCase(fetchJobPageLoad.rejected, (state, action) => {
    //     state.isLoading = false;
    //   });

    builder
      .addCase(fetchJobSearch.pending, (state, _action) => {
        state.isLoading = true;

        // state.isAuthenticated = false;
      })
      .addCase(fetchJobSearch.fulfilled, (state, action) => {
        state.isFiltered = true;
        state.jobs = action.payload.jobs;
        state.totalJobs = action.payload.totalJobs;
        // state.monthlySearch = action.payload.monthlyApplicationsSearch;
        state.isLoading = false;
        state.numberOfPages = action.payload.numberOfPages;
      })
      .addCase(fetchJobSearch.rejected, (state, action) => {
        // state.isEditing = false;
        state.isFiltered = false;
        state.isLoading = false;
        // state.search = null;
        // state.error = action.payload;
      });
  },
});


export const fetchJobDetails = createAsyncThunk(
  fetchSingleJobAction as unknown as string,
  async (jobId: string) => {
    const response = await customAxiosFetch.get(`/job/${jobId}`,);
    
    console.log("🚀 ~ response:", response.data)
   return response.data;
  },
);

interface singleJobSliceState {
  singleJobInfo: any;
  isLoading: boolean
  status: string
}

const SINGLE_JOB_DETAILS: singleJobSliceState = {
  singleJobInfo: [],
  isLoading: false,
  status: ''
};
export const singleJob = createSlice({
  name: 'singleJob',
  initialState: SINGLE_JOB_DETAILS,
  reducers: {
    //   InitialLoading: (state, action) => {
    //     state.isAuthenticated = action.payload;
    //   },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobDetails.pending, (state, _action) => {
        state.isLoading = true;
        // state.isAuthenticated = false;
      })
      .addCase(fetchJobDetails.fulfilled, (state, action) => {
        // state.isEditing = true;
        state.singleJobInfo = action.payload.singleJobInfo;
        // state.totalJobs = action.payload.totalJobs;
        state.isLoading = false;
        state.status = 'success';
        // state.numberOfPages = action.payload.numberOfPages;
        // state.limit = action.payload.limit;
      })
      .addCase(fetchJobDetails.rejected, (state, action) => {
        state.status = 'success';
        // state.isEditing = false;
        // state.isEditing = false;
        state.singleJobInfo = null;
        state.isLoading = false;
        // state.error = action.payload;
      });
  
  },
});

export const fetchJobStats = createAsyncThunk(
  jobsStatsAction as unknown as string,
  async () => {
    const response = await customAxiosFetch.get('/job/stat');
    return response.data;
  },
);

interface JobsStatsType {
  isLoading: boolean;
  stats: any;
  monthlyStats: any;
}

const ALL_JOBS_STATS: JobsStatsType = {
  isLoading: false,
  stats: [],
  monthlyStats: [],
};

export const jobsStats = createSlice({
  name: 'jobsStats',
  initialState: ALL_JOBS_STATS,
  reducers: {
    //   InitialLoading: (state, action) => {
    //     state.isAuthenticated = action.payload;
    //   },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobStats.pending, (state, _action) => {
        state.isLoading = true;
        // state.isAuthenticated = false;
      })
      .addCase(fetchJobStats.fulfilled, (state, action) => {
        // state.isEditing = true;
        state.stats = action.payload.defaultStats;
        state.monthlyStats = action.payload.monthlyApplicationsStats;
        state.isLoading = false;
        // state.numOfPages = action.payload.numOfPages;
      })
      .addCase(fetchJobStats.rejected, (state, action) => {
        // state.isEditing = false;
        state.isLoading = false;
        state.stats = null;
        // state.error = action.payload
      });
  },
});

interface JobsSearchType {
  search: string;
  searchStatus: string;
  searchType: string;
  searchStage: string;
  sort: string;
  sortOptions: string[];
  typeOptions: string[];
  stageOptions: string[];
  statusOptions: string[];
  isLoading: boolean;
  filteredJobs: any;
  isFiltered: boolean;
}

const ALL_JOBS_SEARCH: JobsSearchType | any = {
  search: '',
  jobType: 'all',
  jobStatus: 'all',
  jobStage: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'updated', 'oldest'],
  typeOptions: ['Internship', 'Remote', 'Part-time', 'Full-time'],
  statusOptions: [
    'Connected',
    'Pending',
    'Feedback',
    'Interview',
    'Declined',
    'Aproved',
  ],
  stageOptions: ['1st', '2nd', '3rd', 'Deep'],
  isLoading: false,
  filteredJobs: [],
  isFiltered: false,
};

export const jobsSearch = createSlice({
  name: 'jobsSearch',
  initialState: ALL_JOBS_SEARCH,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    handleSearch: (state, action) => {
      state.search = action.payload.search;
    },
    clearFilter: (state) => {
      return { ...state, ...ALL_JOBS_SEARCH };
    },
  },
  extraReducers: (builder) => {},
});

export const { handleChange,handleSearch, clearFilter } = jobsSearch.actions;
export const { clearStatusField } = jobSlice.actions;
// export const { ReloadData } = jobSlice.actions
