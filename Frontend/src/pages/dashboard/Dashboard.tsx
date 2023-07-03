import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import SideNav from './components/SideNav';
import TopNavBar from './components/TopNavBar';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { fetchUserLoad } from '@/reducers/userReducer';

function Dashboard() {
 
  return (
    <>
      <div className="flex w-full min-h-screen h-full flex-row">
        <div className="flex flex-col items-center justify-between bg-base-200 py-6 md:min-w-[200px]">
          <SideNav />
        </div>
        <div className="flex w-full flex-col">
          <TopNavBar />
          <div className="">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
