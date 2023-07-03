import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch,useSelector, TypedUseSelectorHook  } from 'react-redux';
import { userSlice } from './reducers/userReducer';
import { jobSlice, jobsAll } from './reducers/jobReducer';

const rootReducer = combineReducers({
 user : userSlice.reducer,
 job : jobSlice.reducer,
 jobs : jobsAll.reducer
});

const store = configureStore({
  reducer: rootReducer,
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch

export default store
