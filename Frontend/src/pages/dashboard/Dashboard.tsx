import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import SideNav from './components/SideNav';
import TopNavBar from './components/TopNavBar';

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('pmManUser')) {
      navigate('/intro');
    }
  }, []);

  return (
    <>
      <div className="flex w-full flex-row">
        <div className="flex h-screen flex-col items-center justify-between bg-base-200 py-6 md:min-w-[200px]">
          <SideNav />
        </div>
        <div className="flex w-full flex-col">
          <TopNavBar />
          <div className="p-4">
            <Outlet />
          DashBoard
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
