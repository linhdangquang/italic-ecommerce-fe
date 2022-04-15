import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/material';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import { uploadSingleFile, deleteFile } from '../../utils/uploadFile';
import { BannerSchema } from '../../schema/banner';
import {
  selectBannerById,
  updateBanner,
} from '../../features/HeroBanner/bannerSlice.js';

type FormInputs = {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  status: number;
  imageUrl: string;
};

function UpdateBannerForm() {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
  } = useForm<FormInputs>({ resolver: yupResolver(BannerSchema) });
  const { id } = useParams();
  const banner = useSelector((state: any) => selectBannerById(state, id));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    resetField('imageUrl');
  };
  const onSubmit: SubmitHandler<FormInputs> = async (banner: any) => {
    try {
      setLoading(true);
      const file = banner.imageUrl[0];
      if (selectedImage !== null) {
        await deleteFile(banner.imageName);
        const imgUrl = await uploadSingleFile(file);
        banner.imageUrl = imgUrl;
        banner.imageName = file.name;
      }
      await dispatch(updateBanner(banner));
      toast.success('Banner updated successfully', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setLoading(false);
      navigate('/admin/banners');
    } catch (error) {
      toast.error(error.message, {
        type: 'error',
      });
    }
  };
  useEffect(() => {
    if (banner) {
      reset(banner);
    }
  }, [id, banner, reset]);
  return (
    <div className="flex">
      <div className="card ml-4 mt-4 w-full max-w-4xl flex-shrink-0 bg-base-100 shadow-lg shadow-slate-400 drop-shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-x-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Title</span>
                </label>
                <input
                  className=" input input-info border-2 "
                  type="text"
                  placeholder="Title"
                  {...register('title')}
                />
                {errors?.title?.message && (
                  <Alert
                    severity="error"
                    className="my-1 mb-2"
                    variant="filled"
                  >
                    {errors.title?.message}
                  </Alert>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Subtitle</span>
                </label>
                <input
                  className=" input input-info border-2"
                  type="text"
                  placeholder="Subtitle"
                  {...register('subtitle')}
                />
                {errors?.subtitle?.message && (
                  <Alert
                    severity="error"
                    className="my-1 mb-2"
                    variant="filled"
                  >
                    {errors?.subtitle?.message}
                  </Alert>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Button Text</span>
                </label>
                <input
                  className=" input input-info border-2 "
                  type="text"
                  placeholder="Button Text"
                  {...register('buttonText')}
                />
                {errors?.buttonText?.message && (
                  <Alert
                    severity="error"
                    className="my-1 mb-2"
                    variant="filled"
                  >
                    {errors?.buttonText?.message}
                  </Alert>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Button URL</span>
                </label>
                <input
                  className=" input input-info border-2"
                  type="text"
                  placeholder="Button URL"
                  {...register('buttonLink')}
                />
                {errors?.buttonLink?.message && (
                  <Alert
                    severity="error"
                    className="my-1 mb-2"
                    variant="filled"
                  >
                    {errors?.buttonLink?.message}
                  </Alert>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4">
              <div>
                <div className="form-control my-2">
                  <label className="label">
                    <span className="label-text font-semibold">Image</span>
                  </label>
                  <input
                    className="file:mr-4 file:rounded-full file:border-0
                    file:bg-violet-50 file:py-2
                    file:px-4 file:text-sm
                    file:font-semibold file:text-cyan-500
                    hover:file:bg-violet-100 "
                    type="file"
                    accept="image/*"
                    placeholder="Image"
                    {...register('imageUrl')}
                    onChange={imageChange}
                  />
                  {errors?.imageUrl && (
                    <Alert
                      severity="error"
                      className="my-1 mb-2"
                      variant="filled"
                    >
                      {errors?.imageUrl?.message}
                    </Alert>
                  )}
                </div>
              </div>
              <div className="form-control my-2">
                <label className="label">
                  <span className="label-text font-semibold">Status</span>
                </label>
                <div className="flex gap-x-3">
                  <div className=" flex items-center">
                    <input
                      type="radio"
                      {...register('status')}
                      className="radio radio-accent"
                      value={0}
                      {...(banner?.status === 0 && { checked: true })}
                    />
                    <label className="label">
                      <span className="label-text font-semibold text-teal-500">
                        Active
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      {...register('status')}
                      className="radio border-roseLight  checked:bg-roseLight"
                      value={1}
                      {...(banner?.status === 1 && { checked: true })}
                    />
                    <label className="label">
                      <span className="label-text font-semibold text-roseLight">
                        Inactive
                      </span>
                    </label>
                  </div>
                </div>
                {errors.status?.message && (
                  <Alert
                    severity="error"
                    className="my-1 mb-2"
                    variant="filled"
                  >
                    {errors?.status?.message}
                  </Alert>
                )}
              </div>
            </div>
            {!loading && (
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn  border-2 border-cyan-400  bg-sky-400 py-2 px-4 text-base font-bold text-white shadow shadow-sky-400 hover:bg-sky-500 "
                >
                  update
                </button>
              </div>
            )}
            {loading && (
              <div className="flex min-h-fit items-center justify-center">
                <BeatLoader size={20} color="#34d399" margin={2} />
              </div>
            )}
          </form>
        </div>
      </div>
      {selectedImage ? (
        <div>
          <div className="mt-4 flex h-full flex-col gap-y-2 rounded-md bg-slate-100 px-4 ">
            <h1 className="font-semibold text-gray-600">Image Preview</h1>
            <div>
              <img src={URL.createObjectURL(selectedImage)} alt="" />
            </div>
            <button
              type="button"
              className="btn btn-info mx-auto text-xs text-white shadow-md shadow-cyan-400"
              onClick={removeSelectedImage}
            >
              Remove This Image
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="mt-4 flex h-full w-full flex-col gap-y-2 rounded-md bg-slate-100 px-4">
            <h1 className="font-semibold text-gray-600">Present Image</h1>
            <div>
              <img src={banner?.imageUrl} alt="" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateBannerForm;
