import { useState } from 'react';
import LINKS from './elements/links';
import { Link } from 'react-router-dom';
import Icon from './elements/icon';

function SideNav() {
  const [btnActive, setBtnActive] = useState(1);
  return (
    <>
      <div className="flex w-full h-screen flex-col gap-4 ">
        <h1 className="w-full text-center">Logo</h1>
        <div>
          <Link
            to={'/addjob'}
            onClick={() => setBtnActive(101)}
            className={`${
              btnActive == 101 ? 'btn-active' : 'btn'
            } btn-primary btn-outline btn-lg btn mt-5 w-full  rounded-none`}
          >
            <div className="w-[150px] inline-flex items-center transition hover:scale-110 text-start">
              <Icon icon={'journal'} size={'25px'} />
              Add job
            </div>
          </Link>
        </div>
        <div className='flex flex-col'>
          {LINKS.map((link) => (
            <Link
              to={link.path}
              key={link.id}
              onClick={() => setBtnActive(link.id)}
              className={`${
                btnActive == link.id ? 'btn-active' : 'btn'
              } btn-ghost btn-md btn w-full rounded-none border-b border-b-base-300  justify-start `}
            >
              <div className='inline-flex w-full transition-all items-center h-full hover:ml-4'>
                <Icon icon={link.icon} size={'25px'} /> {link.text}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className=" flex w-full flex-col gap-1"></div>
      <div>Credentials</div>
    </>
  );
}

export default SideNav;
