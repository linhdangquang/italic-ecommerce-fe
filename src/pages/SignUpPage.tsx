import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SignUpForm from '../components/SignUpForm';

function SignUpPage() {
  return (
    <>
      <div className="breadcrumbs px-4 text-xs text-gray-500 md:px-20">
        <ul>
          <li>
            <Link to="/">
              <HomeIcon fontSize="small" />
              Home
            </Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      </div>
      <div className="hero  min-h-full bg-base-200 py-2 pb-40 md:py-16">
        <div className="hero-content w-full  flex-col  justify-end lg:flex-row-reverse ">
          <div className="min-w-xl pl-4 text-center lg:text-left">
            <h1 className="text-5xl font-bold text-blacklight">Sign up now!</h1>
            <p className="pt-6 pb-2">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui,
              quas aspernatur similique quidem aperiam itaque repellat,
              voluptatibus minima dignissimos fuga, vitae eligendi deleniti
              maxime ipsam eaque veniam accusantium voluptate sint.
            </p>
            <p className="italic">
              You have a account?{' '}
              <Link
                to="/signin"
                className=" border-gray-700 font-medium not-italic text-gray-800 hover:border-b"
              >
                Sign in
              </Link>
            </p>
          </div>
          <SignUpForm />
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
