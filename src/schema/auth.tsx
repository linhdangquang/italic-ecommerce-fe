import * as Yup from 'yup';

export const LoginValidationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Invalid email'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export const RegisterValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: Yup.string().required('Email is required').email('Invalid email'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must be less than 50 characters'),
  cpassword: Yup.string()
    .required('Password is required')
    .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
  acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
});
