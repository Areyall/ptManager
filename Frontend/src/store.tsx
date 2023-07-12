import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch,useSelector, TypedUseSelectorHook  } from 'react-redux';
import { userSlice } from './reducers/userReducer';
import { jobSlice, jobsAll, jobsSearch, jobsStats, singleJob } from './reducers/jobReducer';

const rootReducer = combineReducers({
 user : userSlice.reducer,
 job : jobSlice.reducer,
 singleJob : singleJob.reducer,
 jobs : jobsAll.reducer,
 stats : jobsStats.reducer,
 search : jobsSearch.reducer
});

const store = configureStore({
  reducer: rootReducer,
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch

export default store
