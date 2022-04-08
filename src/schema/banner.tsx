import * as Yup from 'yup';

export const BannerSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  subtitle: Yup.string().required('Subtitle is required'),
  buttonText: Yup.string().required('Button Text is required'),
  buttonLink: Yup.string().required('Button Link is required'),
  status: Yup.number().required('Status is required'),
});
