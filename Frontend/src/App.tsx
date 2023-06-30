import Landing from './pages/Landing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/Login';
import Error from './pages/Error';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from './store';
import AllJobs from './pages/dashboard/AllJobs';
import AddJob from './pages/dashboard/AddJob';
import Profile from './pages/dashboard/Profile';
import Stats from './pages/dashboard/Stats';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} >
          <Route path="addjob" element={<AddJob />} />
          <Route path="alljobs" element={<AllJobs />} />
          <Route path="profile" element={<Profile />} />
          <Route path="stats" element={<Stats />} />

          </Route  > 
            
          <Route path="intro" element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
