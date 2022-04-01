import { Alert, Collapse, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { toast, TypeOptions } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInUser } from '../api/user';
import { UserType } from '../types';
import { isAuthenticated } from '../utils/localstorage';
import { LoginValidationSchema } from '../schema/auth';

type Props = any;

type FormInputs = {
  email: string;
  password: string;
};

function SignInForm(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(LoginValidationSchema),
  });
  const navigate = useNavigate();

  const onSignIn: SubmitHandler<FormInputs> = async (user: UserType) => {
    const notify = (message: string, type: TypeOptions) =>
      toast(message, { type });
    try {
      const { data } = await signInUser(user);
      localStorage.setItem('user', JSON.stringify(data));
      notify('Sign in success', 'success');
      navigate('/');
    } catch (error) {
      notify(`Sign in failed ${error.response.data.message}`, 'error');
    }
  };
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setOpen(true);
  }, [errors.email, errors.password]);
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/');
    }
  });
  return (
    <div className="card w-full max-w-md flex-shrink-0 bg-base-100 shadow-lg shadow-slate-400 drop-shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleSubmit(onSignIn)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              className=" input input-bordered input-accent border-2 focus:border-blueSage"
              type="text"
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
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              className="input input-bordered input-accent border-2"
              type="password"
              {...register('password')}
              name="password"
              placeholder="Password"
            />
            {errors.password?.message && (
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
                  {errors.password?.message}
                </Alert>
              </Collapse>
            )}
            <label className="label">
              <a href="#" className="link link-hover label-text-alt">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn  border-2 border-green-400  bg-blueSage py-2 px-4 text-base font-bold text-white shadow shadow-cyan-400 hover:bg-teal-400 "
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignInForm;
