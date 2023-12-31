import customAxiosFetch from '@/utils/axiosBaseUrl';
import { createAsyncThunk, createAction, createSlice } from '@reduxjs/toolkit';

// import axios from 'axios'

const fetchLoginAction = createAction('user/loginUser');
const fetchUserLoadAction = createAction('user/userData');
const fetchUserEdinAction = createAction('user/userEditData');

// Authentication slice

// action
export const fetchLogin = createAsyncThunk(
  fetchLoginAction as unknown as string,
  async (fData: object, thunkApi) => {
    console.log("🚀 ~ fData:", fData)
    // const link = `${customAxiosFetch}/user`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      // withCredentials: true,// for deployment
    };
    try {
      // return (await response.json()) as Returned
      const response = await customAxiosFetch.post(
        '/user/login',
        fData,
        config,
      );
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const fetchUserLoad = createAsyncThunk(
  fetchUserLoadAction as unknown as string,
  async () => {
    const response = await customAxiosFetch.get('/user/me');
    return response.data.user;
  },
);

export const fetchUserUpdate = createAsyncThunk(
  fetchUserEdinAction as unknown as string,
  async (fData: object) => {
    const response = await customAxiosFetch.put('/user/updateUser', fData);

    return response.data.user;
  },
);
interface User {
  _id: string,
  email: string;
  username: string;
  user: object;
  isAuthenticated: boolean;
}

interface UserSliceState {
  loading: boolean;
  user: User | null;
  isAuthenticated: boolean;
  token: string;
  error: string;
  status: string|null;
}

const USER_INITIAL_STATE: UserSliceState = {
  loading: false,
  user: null,
  isAuthenticated: false,
  token: '',
  error: '',
  status: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: USER_INITIAL_STATE,
  reducers: {
    InitialLoading: (state, action) => {
      state.isAuthenticated = action.payload;
    },
      clearStatusField: (state) => {
        state.status = null;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state, _action) => {
        state.loading = true;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.status = 'success'
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.status = 'error'
        state.user = null;
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
    // 			state.user = action.payload
    // 		})
    // 		.addCase(fetchRegister.rejected, (state, action) => {
    // 			state.loading = false
    // 			state.isAuthenticated = false
    // 			state.user = null
    // 			state.error = action.payload
    // 		})

    // fetchUserLoad
    builder
      .addCase(fetchUserLoad.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUserLoad.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(fetchUserLoad.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      });

    builder
      .addCase(fetchUserUpdate.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUserUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.status = 'success'
      })
      .addCase(fetchUserUpdate.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.status = 'error'
      });

    // 	// Logout
    // 	builder
    // 		.addCase(fetchLogout.pending, (state, action) => {
    // 			state.loading = true
    // 			state.isAuthenticated = true
    // 		})
    // 		.addCase(fetchLogout.fulfilled, (state, action) => {
    // 			state.loading = false
    // 			state.isAuthenticated = false
    // 			state.user = null
    // 		})
    // 		.addCase(fetchLogout.rejected, (state, action) => {
    // 			state.error = action.payload
    // 		})
  },
});

export const { InitialLoading,clearStatusField } = userSlice.actions;
// export const { ReloadData } = userSlice.actions
