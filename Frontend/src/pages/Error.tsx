import { Link } from 'react-router-dom';

function Error() {
  return (
    <div className=" flex h-screen w-full flex-col justify-center bg-base-200 ">
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="text-xl">Something went wrong:</h1>
        <p className="text-5xl">404: page not foud</p>
        <Link className='btn-error btn' to={'/intro'}>Back to main</Link>
      </div>
    </div>
  );
}

export default Error;
