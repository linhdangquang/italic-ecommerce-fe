import { Alert, Collapse, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { toast, TypeOptions } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpUser } from '../api/user';
import { UserType } from '../types';
import { isAuthenticated } from '../utils/localstorage';
import { RegisterValidationSchema } from '../schema/auth';

type FormInputs = {
  name: string;
  email: string;
  password: string;
  cpassword: string;
};

function SignUpForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({ resolver: yupResolver(RegisterValidationSchema) });
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FormInputs> = async (user: UserType) => {
    const notify = (message: string, type: TypeOptions) =>
      toast(message, { type });
    try {
      await signUpUser(user);
      notify('Sign up success, please login', 'success');
      navigate('/');
    } catch (error) {
      reset();
      notify(`Sign up failed : ${error.response.data.message}`, 'error');
    }
  };
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setOpen(true);
  }, [errors.email, errors.password, errors.name]);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/');
    }
  });
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
          <div className="form-control grid grid-cols-2 gap-x-2">
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
              <label className="label">
                <Link to="/signin" className="link link-hover label-text-alt">
                  Sign in
                </Link>
              </label>
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
            </div>
          </div>
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn  border-2 border-green-400  bg-blueSage py-2 px-4 text-base font-bold text-white shadow shadow-cyan-400 hover:bg-teal-400 "
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
