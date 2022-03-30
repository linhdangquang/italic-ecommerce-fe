import { Alert, Collapse, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import { signInUser } from '../api/user';
import { UserType } from '../types';

type Props = any;

type FormInputs = {
  email: string;
  password: string;
};

function SignInPage(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const navigate = useNavigate();
  const toastId = React.useRef(null);
  const onSignIn: SubmitHandler<FormInputs> = async (user: UserType) => {
    const notify = (
      message: string,
      type: 'info' | 'success' | 'warning' | 'error' | undefined
    ) => toast(message, { type });
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

  return (
    <div className="hero  min-h-full bg-base-200  py-16 pb-40">
      <div className="hero-content w-full  flex-col  justify-end lg:flex-row-reverse ">
        <div className="min-w-xl pl-4 text-center lg:text-left">
          <h1 className="text-5xl font-bold text-blacklight">Login now!</h1>
          <p className="pt-6 pb-2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui, quas
            aspernatur similique quidem aperiam itaque repellat, voluptatibus
            minima dignissimos fuga, vitae eligendi deleniti maxime ipsam eaque
            veniam accusantium voluptate sint.
          </p>
          <p className="italic">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className=" border-gray-700 font-medium not-italic text-gray-800 hover:border-b"
            >
              Sign up
            </Link>
          </p>
        </div>
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
                  {...register('email', { required: true })}
                  placeholder="Email"
                />
                {errors.email && (
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
                      Email is required
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
                  {...register('password', { required: true })}
                  name="password"
                  placeholder="Password"
                />
                {errors.password && (
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
                      Password is required
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
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
