import customAxiosFetch from '@/utils/axiosBaseUrl';
import { createAsyncThunk, createAction, createSlice } from '@reduxjs/toolkit';

// import axios from 'axios'

const fetchJobAction = createAction('job/jobDetails');
const fetchJobLoadAction = createAction('jobs/allJobs');

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
      console.log(response.data);
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
};

export const jobSlice = createSlice({
  name: 'job',
  initialState: JOB_INITIAL_STATE,
  reducers: {
    //   InitialLoading: (state, action) => {
    //     state.isAuthenticated = action.payload;
    //   },
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
      })
      .addCase(fetchCreateJob.rejected, (state, action) => {
        // state.isEditing = false;
        state.isEditing = false;
        state.job = null;
        // state.error = action.payload;
      });
    // builder
    //   .addCase(fetchUserLoad.pending, (state, _action) => {
    //     state.isEditing = false;
    //     // state.isAuthenticated = false;
    //   })
    //   .addCase(fetchUserLoad.fulfilled, (state, action) => {
    //     // state.isEditing = true;
    //     state.job = action.payload.job;
    //   })
    //   .addCase(fetchUserLoad.rejected, (state, action) => {
    //     // state.isEditing = false;
    //     state.isEditing = false;
    //     state.job = null;
    //     // state.error = action.payload;
    //   });
  },
});

export const fetchJobLoad = createAsyncThunk(
  fetchJobLoadAction as unknown as string,
  async () => {
    const response = await customAxiosFetch.get('/job');
    return response.data;
  },
);

interface allJobsSliceState {
  jobs: any;
  isLoading:boolean
  totalJobs: number;
  page: number;
  numOfPages: number;
}

const ALL_JOBS: allJobsSliceState = {
  jobs: [],
  isLoading:true,
  totalJobs: 0,
  page: 1,
  numOfPages: 1,
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
        state.jobs = [];
        state.isLoading = false;
        // state.isAuthenticated = false;
      })
      .addCase(fetchJobLoad.fulfilled, (state, action) => {
        // state.isEditing = true;
        state.jobs = action.payload.jobs;
        state.totalJobs = action.payload.totalJobs;
        state.isLoading = false;
        // state.numOfPages = action.payload.numOfPages;
      })
      .addCase(fetchJobLoad.rejected, (state, action) => {
        // state.isEditing = false;
        // state.isEditing = false;
        state.jobs = [];
        // state.error = action.payload;
      });
  },
});

// export const { InitialLoading } = jobSlice.actions;
// export const { ReloadData } = jobSlice.actions
