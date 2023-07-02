import Landing from './pages/Landing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/Login';
import Error from './pages/Error';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store, { useAppDispatch, useAppSelector } from './store';
import AllJobs from './pages/dashboard/AllJobs';
import AddJob from './pages/dashboard/AddJob';
import Profile from './pages/dashboard/Profile';
import Stats from './pages/dashboard/Stats';
import ProtectedRoute from './utils/ProtectedRoute';
import { useEffect } from 'react';
import { fetchUserLoad, InitialLoading } from '@/reducers/userReducer';

const App = () => {
  // useEffect(() => {

  //   if (!user) {
  //   dispatch(InitialLoading({ isAuthenticated: false }));
  // }

  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />}>
            <Route path="addjob" element={<AddJob />} />
            <Route path="alljobs" element={<AllJobs />} />
            <Route path="profile" element={<Profile />} />
            <Route path="stats" element={<Stats />} />
          </Route>
        </Route>

        <Route path="intro" element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
