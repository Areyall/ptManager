import { fetchJobStats } from '@/reducers/jobReducer';
import {
  clearStatusField,
  fetchLogin,
  fetchUserLoad,
} from '@/reducers/userReducer';
import { useAppDispatch, useAppSelector } from '@/store';
import { addUserToLocalStorage } from '@/utils/localStorage';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type FormValues = {
  name: string;
  email: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, token, isAuthenticated, loading, error, status } =
    useAppSelector((store) => store.user);

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
    dispatch(fetchLogin(fData));
  };

  const onDemoUserEnter = () => {
    dispatch(
      fetchLogin({ email: 'demo123mail@gmail.com', password: 'demo1234' }),
    );
  };
  useEffect(() => {
    if (status === 'success') {
      toast.success(`Wellcome ${user?.username}`);

      dispatch(clearStatusField());
    }
    if (status === 'error') {
      toast.error(`Something went wrong`);

      dispatch(clearStatusField());
    }
  }, [status]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserLoad());
      dispatch(fetchJobStats());
      addUserToLocalStorage(user!);
      if (error) {
        toast.error('Wrong email or password');
      }
    }

    if (isAuthenticated) {
      navigate('/');
    }
    // if (user ) {
    //     toast.success('Wellcome')
    //     navigate('/')

    // }
  }, [isAuthenticated, error]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-base-200">
      <div className="flex min-w-[400px] flex-col gap-4 bg-base-300 p-10">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <h1 className="text-3xl">Login</h1>

          <input
            type="text"
            {...register('email', { required: true })}
            placeholder="Login"
            // value={name}
            // name="name"
            // onChange={(e) => setName(e.target.value)}
          />
          <input
            type="password"
            {...register('password', { required: true, minLength: 4 })}
            placeholder="Password"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="btn-outline btn">
            Submit
          </button>
        </form>
        <button
          type="submit"
          className="btn-outline btn"
          onClick={() => onDemoUserEnter()}
        >
          Demo user
        </button>
        <div className="pt-8">
          <div
            className="tooltip tooltip-bottom"
            data-tip="Only for a chosen one"
          >
            {/* <p>{isMember ? 'Not a member yet?' : 'Already a member?'}</p> */}
            {/* <button
              onClick={() => seIsMember(!isMember)}
              className="btn-disabled   btn-sm"
              >
              {isMember ? 'Register' : 'Login'}
            </button> */}
            <button className="btn-outline btn-disabled btn-sm btn ">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
