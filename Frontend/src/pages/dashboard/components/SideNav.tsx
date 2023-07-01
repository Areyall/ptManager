import { useState } from 'react';
import LINKS from './elements/links';
import { Link } from 'react-router-dom';

function SideNav() {
  const [btnActive, setBtnActive] = useState(1);
  return (
    <>
      <div>Logo</div>
      <div className=" flex flex-col gap-4">
        {LINKS.map((link) => (
          <Link
            to={link.path}
            key={link.id}
            onClick={() => setBtnActive(link.id)}
            className={`${
              btnActive == link.id ? 'btn-active' : 'btn'
            } btn-outline btn-sm btn `}
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
