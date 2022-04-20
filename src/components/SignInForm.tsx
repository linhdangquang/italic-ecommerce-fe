import { Alert, Collapse, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { PropagateLoader } from 'react-spinners';
import { signIn } from '../features/Auth/authSlice.js';
import { UserType } from '../types';
import { LoginValidationSchema } from '../schema/auth';
import { clearMessage } from '../features/Messages/messageSlice.js';

type FormInputs = {
  email: string;
  password: string;
};

function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(LoginValidationSchema),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, user } = useSelector((state: any) => state.auth);
  const { message } = useSelector((state: any) => state.message);

  const onSignIn: SubmitHandler<FormInputs> = async (userForm: UserType) => {
    setLoading(true);
    message && dispatch(clearMessage());
    setTimeout(async () => {
      await dispatch(signIn(userForm))
        .unwrap()
        .then(() => {
          toast.success('Sign in successfully', {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        })
        .catch(() => {
          setLoading(false);
        });
    }, 700);
  };
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setOpen(true);
  }, [errors.email, errors.password]);
  if (isLoggedIn) {
    if (user.user.role === 'admin') {
      navigate('/admin');
    }
    if (user.user.role === 'user') {
      navigate('/');
    }
  }
  React.useEffect(() => {
    document.title = 'Sign in';
  }, []);
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
          {message && (
            <div className="form-group">
              <Alert severity="error" variant="filled">
                {message}
              </Alert>
            </div>
          )}
          {loading === true ? (
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
                Sign in
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default SignInForm;
