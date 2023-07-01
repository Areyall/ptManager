## Productivity Manager Frontend

## 6.1 What's New in 6.4 / NEW RELEASE, enables "client side routing" by creating a `Router` and linking/submitting to pages with `Link` and `<Form>`
`<Route path="dashboard" element={<Dashboard />} loader={({ request }) => fetch("/api/dashboard.json", { signal: request.signal, }) } />`

!! 6.4 not copletely ready just yet
+ setup routes `import { BrowserRouter, Route, Routes } from 'react-router-dom';`


## Redux react-redux + TypeScript


// Reducer.tsx

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

// Store.tsx

    import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch,useSelector, TypedUseSelectorHook  } from 'react-redux';
import { userSlice } from './reducers/userReducer';

const rootReducer = combineReducers({
 user : userSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch

export default store

## 12 HTTP Requests / VERBs for login/register
    
            HTTP request logger middleware -> npm i morgan

            npm i axios
            GET ->  axios/instance.get(url[, config]) // axios.get(url, options) 
            POST ->  axios/customAxiosFetch.post(url[, data[, config]]) // axios.post(url,resource,options)

            Custom instance defaults
            // Set config defaults when creating the instance
                    const instance = axios.create({
                    baseURL: 'https://api.example.com'
                    }); 
                    //
                    const customAxiosFetch = axios.create({
                    baseURL: 'http://127.0.0.1:4000/api/v1'
                  });

## 14 Dashboard
   addJob, allJobs,  Profile, Stats

   14.1 navbar, sidebars

   14.2 Sidebar style and navigation setup
    - Optimization render list of buttons with .map
   
## 15 Back protected routes

## 16
  Profile update page
    Steps: 
      + include global store
      + useState
      + make form to collect data with submit ->
          ++ submit logic function
      
      ?+ patches: useForm() 'react-hook-form' 
    