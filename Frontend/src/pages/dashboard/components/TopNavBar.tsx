import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './elements/icon';
// import { useNavigate } from 'react-router-dom';

function TopNavBar() {
// let navigate = useNavigate()
  const logoutHandler = (e:any) => { 
    localStorage.removeItem('pmManUser')
    // if ( localStorage.getItem('pmManUser') === null) {
    
    //   navigate('/intro')
    // }
   }
  return (
    <>
      <div className="navbar bg-base-300 justify-between">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn-ghost btn lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
            >
              <li>
                <Link to={'/addjob'}>Add job</Link>
              </li>
              <li>
                <Link to={'/alljobs'}>All jobs</Link>
              </li>
            </ul>
          </div>
          <Link to={'/'} className="w-full max-w-[150px]">
          <Icon icon='logo' size=''/>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          {/* <ul className="menu menu-horizontal px-1">
            <li>
              <Link to={'/addjob'}>Add job</Link>
            </li>
            <li>
              <Link to={'/alljobs'}>All jobs</Link>
            </li>
          </ul> */}
        </div>
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
            <div className="w-10 rounded-full">
              <img src="https://i.imgur.com/De1rs61.png" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-sm z-[1] mt-3 w-52 bg-base-300 p-2 shadow"
          >
            <li>
              <Link to={'/profile'} className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            {/* <li>
              <a>Settings</a>
            </li> */}
            <li>
              <a href='/intro' onClick={(e) => logoutHandler(e)}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default TopNavBar;
