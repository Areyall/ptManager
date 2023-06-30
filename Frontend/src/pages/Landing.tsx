import { Link } from "react-router-dom";

function Landing() {
  return (
    <main className="bg-base-200 min-h-screen">
      <nav className="p-4">
        <img src="https://i.imgur.com/VY6mRq5.png" alt="logo" />
      </nav>
      <div className="container m-auto">
        <div className="flex flex-col items-center gap-8">
            <div className=" flex flex-col max-w-2xl gap-4 items-center ">
              <h1 className="text-2xl">Productivity tracker</h1>
              <p className="font-semibold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut eum
                minus ex perspiciatis, non vitae amet praesentium repudiandae hic
                quis animi quia beatae quibusdam, quisquam quo voluptatum nobis
                alias eligendi.
              </p>
              <Link to={'/login'} className="btn btn-primary">Login/Register</Link>
            </div>
            <img className="max-w-xl" src="https://i.imgur.com/T6EyjLL.png" alt="Intro image" />
        </div>
      </div>
    </main>
  );
}

export default Landing;
