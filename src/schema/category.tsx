import * as Yup from 'yup';

export const CategoryValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(40, 'Name must be less than 50 characters'),
});
