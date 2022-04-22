import { Alert, Collapse, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { toast, TypeOptions } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { PropagateLoader } from 'react-spinners';
import { UserType } from '../types';
import { RegisterValidationSchema } from '../schema/auth';
import { registerUser } from '../features/Auth/authSlice.js';
import { clearMessage } from '../features/Messages/messageSlice.js';

type FormInputs = {
  name: string;
  email: string;
  password: string;
  cpassword: string;
};

function SignUpForm() {
  const [successful, setSuccessful] = useState(true);
  const { message } = useSelector((state: any) => state.message);
  const { isLoggedIn } = useSelector((state: any) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({ resolver: yupResolver(RegisterValidationSchema) });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<FormInputs> = async (user: UserType) => {
    setSuccessful(false);
    message && dispatch(clearMessage());
    setTimeout(async () => {
      await dispatch(registerUser(user))
        .unwrap()
        .then(() => {
          toast.success('Sign up successfully, please sign in now', {
            position: toast.POSITION.TOP_RIGHT,
          });
          navigate('/signin');
        })
        .catch(() => {
          setSuccessful(true);
        });
    }, 750);
  };
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);
  useEffect(() => {
    reset();
  }, [reset, successful]);
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setOpen(true);
  }, [errors.email, errors.password, errors.name]);

  if (isLoggedIn) {
    navigate('/');
  }
  useEffect(() => {
    document.title = 'Sign up';
  }, []);
  return (
    <div className="card w-full max-w-md flex-shrink-0 bg-base-100 shadow-lg shadow-slate-400 drop-shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              className=" input input-bordered input-accent border-2 focus:border-blueSage"
              type="text"
              autoComplete="off"
              placeholder="Name"
              {...register('name')}
            />
            {errors.name?.message && (
              <Collapse in={open}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  {errors?.name.message}
                </Alert>
              </Collapse>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              className=" input input-bordered input-accent border-2 focus:border-blueSage"
              type="text"
              autoComplete="off"
              placeholder="Email"
              {...register('email')}
            />
            {errors.email?.message && (
              <Collapse in={open}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  {errors.email?.message}
                </Alert>
              </Collapse>
            )}
          </div>
          <div className="form-control grid grid-cols-1 gap-x-2 sm:grid-cols-2">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                className="input input-bordered input-accent border-2"
                type="password"
                autoComplete="off"
                {...register('password')}
                name="password"
                placeholder="Password"
              />
              {errors.password?.message && (
                <Collapse in={open}>
                  <Alert
                    severity="error"
                    className="text-xs"
                    action={
                      <IconButton
                        size="small"
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                  >
                    {errors.password?.message}
                  </Alert>
                </Collapse>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm password</span>
              </label>
              <input
                className="input input-bordered input-accent border-2"
                type="password"
                autoComplete="off"
                {...register('cpassword')}
                placeholder="Re-enter password"
              />
              {errors.cpassword?.message && (
                <Collapse in={open}>
                  <Alert
                    severity="error"
                    className="text-xs"
                    action={
                      <IconButton
                        size="small"
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                  >
                    {errors.cpassword?.message}
                  </Alert>
                </Collapse>
              )}
              <label className="label">
                <Link
                  to="/signin"
                  className="link link-hover label-text-alt ml-auto text-right"
                >
                  Sign in
                </Link>
              </label>
            </div>
          </div>
          {message && (
            <div className="form-group">
              <Alert severity="error" variant="filled">
                {message}
              </Alert>
            </div>
          )}
          {successful === false ? (
            <div className="form-control pt-1  text-center">
              <PropagateLoader size={15} color="#34d399">
                {' '}
              </PropagateLoader>
            </div>
          ) : (
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn  border-2 border-green-400  bg-blueSage py-2 px-4 text-base font-bold text-white shadow shadow-cyan-400 hover:bg-teal-400 "
              >
                Sign up
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
