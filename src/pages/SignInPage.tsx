import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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
  const onSignIn: SubmitHandler<FormInputs> = async (user: UserType) => {
    try {
      const { data } = await signInUser(user);
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/');
      alert(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>SignInPage</h1>
      <form onSubmit={handleSubmit(onSignIn)}>
        <input
          type="text"
          {...register('email', { required: true })}
          placeholder="email"
        />
        {errors.email && <p>email is required</p>}
        <input
          type="text"
          {...register('password', { required: true })}
          name="password"
          placeholder="password"
        />
        {errors.password && <p>password is required</p>}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignInPage;
