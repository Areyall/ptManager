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
import MainTaskPage from './pages/dashboard/components/tasks/MainTaskPage';

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
          <Route index element={<Stats />} />
          <Route path="/addjob" element={<AddJob />} />
          <Route path="/job/:jobId" element={<MainTaskPage />} />
          <Route path="/alljobs" element={<AllJobs />} />
          <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      
      <Route path="intro" element={<Landing />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<Error />} />
</Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
};

export default App;
