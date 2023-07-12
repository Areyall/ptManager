import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import SideNav from './components/SideNav';
import TopNavBar from './components/TopNavBar';
import { fetchUserLoad } from '@/reducers/userReducer';
import { useAppDispatch, useAppSelector } from '@/store';

function Dashboard() {
  const { user } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   if (!user) {
  //     dispatch(fetchUserLoad());
  //   }
  // }, []);

  return (
    <>
      <div className="flex h-full min-h-screen w-full flex-row relative">
        <div className="flex flex-col items-center h-screen  bg-base-300 py-8  md:min-w-[150px] top-0 sticky">
          <SideNav />
        </div>
        <div className="flex w-full flex-col">
          <TopNavBar />
          <div className=" ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
