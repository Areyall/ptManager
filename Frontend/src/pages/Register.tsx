import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type FormValues = {
  name: string;
  email: string;
  password: string;
};

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isMember, seIsMember] = useState(false);

  // const handleChange: any = (e: { target: { value: any } }) => {
  //   console.log(e.target.value);
  // };
  const onSubmit: SubmitHandler<FormValues> = (e: any, data: any) => {
    e.preventDefault;
    const fData = watch(data);
    if (!fData.name || !fData.password || (!isMember && !fData.email)) {
      toast.warning('Fill all fields');
      console.log(fData);
    }
    if (isMember) {
      console.log({ name: fData.name, password: fData.password });
    }
    if (!isMember) {
      console.log(fData);
    }
    console.log(isMember);
  };

  {
    errors.email && <span>Name field is required</span>;
  }
  return (
    <div className="flex h-screen w-full items-center justify-center bg-base-200">
      <div className="flex flex-col bg-base-300 p-10">
        {/* "handleSubmit" will validate your inputs before invoking "onSubmit"  */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <h1 className="text-h3">{isMember ? 'Login' : 'Register'}</h1>
          {/* {(errors.name || errors.password || (!isMember && errors.email)) && toast.warning('Fill all fields')} */}
          {isMember ? (
            <div>
              <input
                type="text"
                {...register('name', { required: true })}
                placeholder="Login"
                // value={name}
                // name="name"
                // onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <span>Name field is required</span>}
            </div>
          ) : (
             <div>
              <input
                type="text"
                {...register('name', { required: true })}
                placeholder="Login"
                // value={name}
                // name="name"
                // onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <span>Name field is required</span>}
            </div>
          )}

          {isMember ? null : (
            <div>
              <input
                type="email"
                {...register('email', { required: true, minLength: 6 })}
                placeholder="Email"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
              />
              {errors.email && <span>Email field is required</span>}
            </div>
          )}

          {isMember ? (
            <div>
              <input
                type="password"
                {...register('password', { required: true, minLength: 6 })}
                placeholder="Password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <span>Password field is required</span>}
            </div>
          ) : (
            <div>
              <input
                type="password"
                {...register('password', { required: true, minLength: 6 })}
                placeholder="Password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <span>Password field is required</span>}
            </div>
          )}


          <button type="submit" className="btn-outline btn">
            Submit
          </button>
        </form>
        <div className="pt-8">
          <p>{isMember ? 'Not a member yet?' : 'Already a member?'}</p>
          <button
            onClick={() => seIsMember(!isMember)}
            className="btn-ghost btn-sm"
          >
            {isMember ? 'Register' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
