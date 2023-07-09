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
   
## 15 Back protected routes + Frontend

    Protected routes component:
      + Require user  after initiating <ProtectedRoute>
      initiation:

        if (!isAuthenticated ) {
			dispatch(fetchUserLoad()).unwrap().catch((error) => {
			  console.error('Error fetching user data:', error);
			}); }}}, [isAuthenticated, dispatch])

      then:
         useEffect(() => {
          if (!isAuthenticated ) {
            navigate('/login');
          }
          }, []);

## 16 Profile update page
  
    Steps: 
      + include global store
      + useState
      + make form to collect data with submit ->
          ++ submit logic function
      
      ?+ patches: useForm() 'react-hook-form' 

## 17 HTTP Requests settings
    cases where you may need to send header:
      1.Authorization: send an authorization token with your request
          // If you are using cookies for authentication, you typically don't need to include the Authorization header explicitly in your requests //

      2. Content-Type: When sending data in the request body Specifies the media type:
            'Content-Type: application/json' for JSON data
            'Content-Type: application/x-www-form-urlencoded' for URL-encoded form data
            'Content-Type: multipart/form-data' for multipart/form-data
      3. Accept: If you expect a specific response format from the server
      4. Custom headers:

        1.1 authorization via an Authorization header
        +Frontend 
          const response = await axios.put('/user/updateUser', fData, {
            headers: {
              Authorization: `Bearer ${token}`, },});
        
        +Backend 
            const updateUser = async (req, res) => {
            const { authorization } = req.headers;
            // Extract the token from the Authorization header
            const token = authorization && authorization.split(' ')[1];
            // Validate and decode the token (e.g., using jsonwebtoken library)
            try {
              const decoded = jwt.verify(token, secretKey);
              // Access the user ID from the decoded token
              const userId = decoded.userId;
              // Continue with updating the user profile
              // ...
            } catch (error) {
              // Handle invalid/expired token error
              res.status(401).json({ message: 'Unauthorized' });
            }
          };

        + Axios interceptors intercept and modify the request or response before they are handled,  two types of interceptors: request interceptors and response interceptors:
          + Request - allow you to modify the request headers, data, or perform any other necessary operations before the request is sent; can be useful for adding authorization headers, logging requests, or performing request transformations.
              axios.interceptors.request.use(
               prop1) callback function that receives the request configuration object
                function (config) {
                  // Modify request config
                  config.headers.Authorization = 'Bearer <token>';
                  // Perform other operations
                  return config;},
               prop2)  an optional error handler function that will be called if there is an error during the request interception
                function (error) {
                  // Handle request error
                  return Promise.reject(error); } );

          + Response interceptors functions that are executed after the response is received but before the response is passed to the application code.:
            -> Silimilar logic to request

## 16 Backend Job Model

## 17 Job redux slices
  separate slice + logic

## 18 All jobs page
    18.1 component for jobs
    18.2 component for single job card
    18.3 redirect to single job card details

# 19 BAckend stats

## 20 Frontend stats page
  + setup separate reducers
    -> specifu useAppSelector, so it load oly chunk
      -> load dataconditionaly
      
  + Structure x3 files Stat, StatContainer, ChartsContainer, StatItems
  + Hardcoded data with job status
  + Stats at dashboard

## 21 Backend

## 22 Charts 
  + Recharts -> npm i recharts
   ++ BarChart && AreaChart

## 24 Search inputs
    + Redux slice + initial values
    
          {/* <input type="reset" value="Reset"></input> */}
          The Selection inputs, onChange dispatching every single one.
          gather the Storage data, display filtered Jobs.

##  25 Pagination
        npm i react-paginate

          manual instalation
            some frontend component variables, styling


## 26 Back pagination 

## UI corrections 

    + Icons
    + Warnings
    + Notificationss
    

  
  



              