import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Alert } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { changeInfo } from '../features/Auth/authSlice.js';
import { uploadAvatar, delAvatar } from '../utils/uploadFile';
import { UserSchema } from '../schema/user';
import { clearMessage } from '../features/Messages/messageSlice.js';

type FormInputs = {
  name: string;
  avatarUrl: string | undefined;
};

export default function ProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    reset,
  } = useForm<FormInputs>({ resolver: yupResolver(UserSchema) });
  const [selectedImage, setSelectedImage] = useState(null);
  const [successful, setSuccessful] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { message } = useSelector((state: any) => state.message);
  const { user, isLoggedIn } = useSelector((state: any) => state.auth);

  const onSubmit: SubmitHandler<FormInputs> = async (data: any) => {
    setSuccessful(false);
    message && dispatch(clearMessage());
    const file = data.avatarUrl[0];
    if (selectedImage !== null) {
      await delAvatar(data.avatarName);
      const imgUrl = await uploadAvatar(file);
      data.avatarUrl = imgUrl;
      data.avatarName = file.name;
    }
    setTimeout(async () => {
      await dispatch(changeInfo(data))
        .unwrap()
        .then(() => {
          toast.success('Change your info successfully.', {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          navigate('/');
        })
        .catch(() => {
          setSuccessful(true);
        });
    }, 750);
  };
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    resetField('avatarUrl');
  };
  useEffect(() => {
    if (isLoggedIn === false) return navigate('/');
  }, []);
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);
  useEffect(() => {
    reset(user?.user);
  }, [user, reset, dispatch]);

  return (
    <div className="min-h-screen px-20 py-4">
      <div className="flex">
        <div className="card mt-4 w-full max-w-4xl flex-shrink-0 bg-base-100 shadow-lg shadow-slate-400 drop-shadow-2xl">
          <div className="card-body">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex h-full flex-col justify-between"
            >
              <div className="grid grid-cols-2 gap-x-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Name</span>
                  </label>
                  <input
                    className=" input input-info border-2 "
                    type="text"
                    placeholder="Name"
                    {...register('name')}
                  />
                  {errors.name?.message && (
                    <Alert
                      severity="error"
                      className="my-1 mb-2"
                      variant="filled"
                    >
                      {errors.name?.message}
                    </Alert>
                  )}
                </div>
                <div className="form-control my-2">
                  <label className="label">
                    <span className="label-text font-semibold">Avatar</span>
                  </label>
                  <input
                    className="file:mr-4 file:rounded-full file:border-0
                    file:bg-violet-50 file:py-2
                    file:px-4 file:text-sm
                    file:font-semibold file:text-cyan-500
                    hover:file:bg-violet-100"
                    type="file"
                    accept="image/*"
                    placeholder="Avatar"
                    {...register('avatarUrl')}
                    onChange={imageChange}
                  />
                  {errors.avatarUrl?.message && (
                    <Alert
                      severity="error"
                      className="my-1 mb-2"
                      variant="filled"
                    >
                      {errors.avatarUrl?.message}
                    </Alert>
                  )}
                </div>
              </div>
              {message && (
                <div className="form-group">
                  <Alert severity="error" variant="filled">
                    {message}
                  </Alert>
                </div>
              )}
              {successful === true && (
                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className="btn  border-2 border-cyan-400  bg-sky-400 py-2 px-4 text-base font-bold text-white shadow shadow-sky-400 hover:bg-sky-500 "
                  >
                    change info
                  </button>
                </div>
              )}
              {successful === false && (
                <div className="flex min-h-fit items-center justify-center">
                  <BeatLoader size={20} color="#34d399" margin={2} />
                </div>
              )}
            </form>
          </div>
        </div>
        {selectedImage ? (
          <div>
            <div className="mt-4 flex h-full flex-col gap-y-2 rounded-md bg-slate-100 px-4 ">
              <h1 className="font-semibold text-gray-600">Avatar Preview</h1>
              <div className="avatar">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt=""
                  className="rounded-full md:h-80 md:w-80"
                />
              </div>
              <button
                type="button"
                className="btn btn-info mx-auto text-xs text-white shadow-md shadow-cyan-400"
                onClick={removeSelectedImage}
              >
                Remove This Image
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mt-4 flex h-full w-full flex-col gap-y-2 rounded-md bg-slate-100 px-4">
              <h1 className="font-semibold text-gray-600">Present Avatar</h1>
              <div className="avatar">
                <img
                  src={user?.user.avatarUrl}
                  alt=""
                  className="rounded-full md:h-80 md:w-80"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
