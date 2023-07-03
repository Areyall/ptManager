import customAxiosFetch from '@/utils/axiosBaseUrl';
import { createAsyncThunk, createAction, createSlice } from '@reduxjs/toolkit';

// import axios from 'axios'

const fetchJobAction = createAction('job/jobDetails');

export const fetchJob = createAsyncThunk(
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
      .addCase(fetchJob.pending, (state, _action) => {
        state.isEditing = false;
        // state.isAuthenticated = false;
      })
      .addCase(fetchJob.fulfilled, (state, action) => {
        // state.isEditing = true;
        state.job = action.payload.job;
      })
      .addCase(fetchJob.rejected, (state, action) => {
        // state.isEditing = false;
        state.isEditing = false;
        state.job = null;
        // state.error = action.payload;
      });

    // 	// fetchRegister
    // 	builder
    // 		.addCase(fetchRegister.pending, (state, action) => {
    // 			state.loading = true
    // 			state.isAuthenticated = false
    // 		})
    // 		.addCase(fetchRegister.fulfilled, (state, action) => {
    // 			state.loading = false
    // 			state.isAuthenticated = true
    // 			state.job = action.payload
    // 		})
    // 		.addCase(fetchRegister.rejected, (state, action) => {
    // 			state.loading = false
    // 			state.isAuthenticated = false
    // 			state.job = null
    // 			state.error = action.payload
    // 		})

    // fetchjobLoad

    // 	// Logout
    // 	builder
    // 		.addCase(fetchLogout.pending, (state, action) => {
    // 			state.loading = true
    // 			state.isAuthenticated = true
    // 		})
    // 		.addCase(fetchLogout.fulfilled, (state, action) => {
    // 			state.loading = false
    // 			state.isAuthenticated = false
    // 			state.job = null
    // 		})
    // 		.addCase(fetchLogout.rejected, (state, action) => {
    // 			state.error = action.payload
    // 		})
  },
});

// export const { InitialLoading } = jobSlice.actions;
// export const { ReloadData } = jobSlice.actions
