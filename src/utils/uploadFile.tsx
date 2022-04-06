import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import storage from '../api/firebase';

export const uploadSingleFile = async (file: File) => {
  if (!file) return;
  const storageRef = ref(storage, `products/${file.name}`);
  await uploadBytesResumable(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

export const deleteFile = async (fileName: string) => {
  if (!fileName) return;

  const deleteRef = ref(storage, `products/${fileName}`);
  await deleteObject(deleteRef).then(() => {
    console.log('File deleted');
  });
};
