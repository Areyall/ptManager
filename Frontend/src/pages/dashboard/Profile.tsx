import { fetchUserUpdate } from '@/reducers/userReducer';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormValues = {
  username: string;
  email: string;
  mode: any;
};

function Profile() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  // const { onChange, onBlur, name, ref } = register('username');

  const { user } = useAppSelector((store: RootState) => store.user);
  const dispatch = useAppDispatch();

  const [newName, setName] = useState(user?.email);
  const [newEmail, setEmail] = useState(user?.username);

  const onSubmit: SubmitHandler<FormValues> = async (e: any, data: any) => {
    e.preventDefault;
    const fData = watch(data);
    dispatch(fetchUserUpdate(fData));
  };

  return (
    <>
      <div className="bg-base-200 min-h-screen p-8">
        <div className=" bg-base-200p-4 m-auto max-w-2xl rounded">
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
                  value={newName}
                  {...register('email', {
                    onChange: (e) => setName(e.target.value),
                  })}
                  // placeholder={newName}
                />
              </div>
              <div>
                Username:
                <input
                  type="text"
                  value={newEmail}
                  {...register('username', {
                    onChange: (e) => setEmail(e.target.value),
                  })}
                  // placeholder={newEmail}
                />
              </div>
            </div>
            <button type="submit" className="btn-outline btn max-w-[210px]">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Profile;
