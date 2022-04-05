import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCQVHXAziWQyLilw2vHkVxyzfNHrRcnzEw',
  authDomain: 'web502-project.firebaseapp.com',
  projectId: 'web502-project',
  storageBucket: 'web502-project.appspot.com',
  messagingSenderId: '264214214458',
  appId: '1:264214214458:web:15badd70c8a30a49684203',
  measurementId: 'G-WDQ9J6T5RF',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, 'gs://web502-project.appspot.com');

export default storage;
