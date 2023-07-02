import { useState } from 'react';
import LINKS from './elements/links';
import { Link } from 'react-router-dom';

function SideNav() {
  const [btnActive, setBtnActive] = useState(1);
  return (
    <>
      <div className='w-full '>
        <h1 className='text-center w-full'>Logo</h1>
        <Link
              to={'/addjob'}
              onClick={() => setBtnActive(101)}
              className={`${
                btnActive == 101 ? 'btn-active' : 'btn'
              } btn-primary btn-outline mt-5 btn-lg btn w-full rounded-none`}
            >Add job</Link>
      </div>
      <div className=" flex flex-col gap-1 w-full">
        {LINKS.map((link) => (
          <Link
            to={link.path}
            key={link.id}
            onClick={() => setBtnActive(link.id)}
            className={`${
              btnActive == link.id ? 'btn-active' : 'btn'
            } btn-outline btn-md btn w-full rounded-none`}
          >
          
            {link.text}
          </Link>
        ))}
      </div>
      <div>Credentials</div>
    </>
  );
}

export default SideNav;
