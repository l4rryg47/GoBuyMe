import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDAUjDBxI2-pEc83fKorakfZWI9j4YlLlg",
  authDomain: "com.yournickname.appname",
  projectId: "gobuyme-c49cf",
  storageBucket: "gobuyme-c49cf.firebasestorage.app",
  messagingSenderId: "788216979438",
  appId: "1:788216979438:android:049c8abb94d397b91c78ff"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export { app };