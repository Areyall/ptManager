import { fetchUserUpdate } from '@/reducers/userReducer';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormValues = {
  username: string;
  email: string;
};

interface Item {
  email: string;
  username: string;
}
function Profile() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const { user } = useAppSelector((store: RootState) => store.user);
  const dispatch = useAppDispatch();

  const [newName, setName] = useState(user?.email ?? '');
  const [newEmail, setEmail] = useState(user?.username ?? '');

  const onSubmit: SubmitHandler<FormValues> = async (e: any, data: any) => {
    e.preventDefault;
    const fData = watch(data);
console.log(fData)
    dispatch(fetchUserUpdate(fData));
  };

  return (
    <>
      <div className='bg-base-200 p-8'>
        <div className=" m-auto max-w-2xl bg-base-200p-4 rounded">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <h1 className="text-3xl">Profile</h1>
            <div className=" grid grid-cols-3   gap-8">
              <div>
                Email:
                <input
                  type="email"
                  // value={newName}
                  {...register('email', { required: true, minLength: 4 })}
                  placeholder={newName}
                />
              </div>
              <div>
                Username:
                <input
                  type="text"
                  // value={newEmail}
                  {...register('username', { required: true, minLength: 3 })}
                  placeholder={newEmail}
                />
              </div>
            </div>
            <button type="submit" className="btn-outline max-w-[210px] btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Profile;
