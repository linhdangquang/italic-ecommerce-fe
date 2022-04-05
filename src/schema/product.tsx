import * as Yup from 'yup';

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
export const ProductValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be less than 50 characters'),
  price: Yup.number()
    .typeError('Amount must be a number')
    .required('Price is required')
    .min(1, 'Price must be at least 1'),
  description: Yup.string().required('Description is required'),
  image: Yup.mixed()
    .test('fileSize', 'Image is requied', (value) => {
      console.log(value);
      if (value.length === 0) {
        return false;
      }
      return true;
    })
    .test('fileType', 'Unsupported Format', (value) => {
      const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
      return SUPPORTED_FORMATS.includes(value[0].type);
    })
    .test('fileSize', 'Image Size is too larger max is 2MB', (value) => {
      const sizeInBytes = 2000000; // 0.5MB
      return value.size <= sizeInBytes;
    }),
  category: Yup.string()
    .nullable()
    .typeError('Amount must be a number')
    .required('Image is required'),
  stock: Yup.number()
    .typeError('Amount must be a number')
    .required('Stock is required')
    .min(0, 'Stock must be at least 0'),
  status: Yup.number().required('Status is required'),
});
