import { useNavigate, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import { useEffect } from 'react';
import { fetchUserLoad } from '@/reducers/userReducer';
import { fetchJobStats } from '@/reducers/jobReducer';
import { getUserToLocalStorage } from './localStorage';

function ProtectedRoute() {
  const navigate = useNavigate();
  // const { isAuthenticated, user, loading } = useAppSelector(
  //   (store) => store.user,
  // );

  const dispatch = useAppDispatch();
  //   useEffect(() => {
  //     if (!loading) {
  //       if (isAuthenticated) {
  //         dispatch(fetchUserLoad());
  //       }
  //     }
  //   }, []);
  useEffect(() => {
    if (localStorage.getItem('pmManUser') === null) {
      navigate('/login');
    }
  }, []);
  return (
    <>
      {/* {isAuthenticated ? <Outlet /> : navigate('/login')} */}
      {/* {loading === false && (isAuthenticated ? <Outlet /> : navigate('/login'))} */}{' '}
      <Outlet />
    </>
  );
}

export default ProtectedRoute;
