import { useNavigate, Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store'
import { useEffect } from 'react';
import { fetchUserLoad } from '@/reducers/userReducer';

function ProtectedRoute() {
	const navigate = useNavigate()
	const { isAuthenticated, user } = useAppSelector(store => store.user)

	const dispatch = useAppDispatch();
	useEffect(() => {
		
		if (!isAuthenticated ) {
			dispatch(fetchUserLoad())
			.unwrap()
			.catch((error) => {
			  // Handle the error, e.g., show an error message or redirect to an error page
			  console.error('Error fetching user data:', error);
			});
		  }
		// }
	  }, [isAuthenticated, dispatch]);



		  useEffect(() => {
			if (!isAuthenticated ) {
			  navigate('/login');
			}
		  }, []);
	return (
		<>
			{/* {isAuthenticated ? <Outlet /> : navigate('/login')} */}
			<Outlet />
		</>
	)
}

export default ProtectedRoute