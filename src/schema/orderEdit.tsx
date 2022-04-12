import * as Yup from 'yup';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const OrderEditValidationSchema = Yup.object().shape({
  address: Yup.string().required('Address is required').trim(),
  email: Yup.string()
    .email('Email is invalid')
    .required('Email is required')
    .trim(),
  phone: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone number is required')
    .trim(),
  city: Yup.string().required('City is required').trim(),
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .trim(),
});
