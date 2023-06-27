import { createSlice } from '@reduxjs/toolkit';

interface UserSliceState {
  isLoading: boolean;
  user: null;
}

const USER_INITIAL_STATE: UserSliceState = {
  isLoading: false,
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: USER_INITIAL_STATE,
  reducers: {
    ShowLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});


export const { ShowLoading } = userSlice.actions;
