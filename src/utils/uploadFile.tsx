import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import storage from '../api/firebase';

export const uploadSingleFile = async (file: File) => {
  if (!file) return;
  const storageRef = ref(storage, `products/${file.name}`);
  await uploadBytesResumable(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};
