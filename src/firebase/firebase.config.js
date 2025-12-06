// Initialize Firebase and export `auth`
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCSsSyUVQfvb1YxbYCumCuTJqthGSchEZQ",
  authDomain: "scholarstream-453fe.firebaseapp.com",
  projectId: "scholarstream-453fe",
  storageBucket: "scholarstream-453fe.firebasestorage.app",
  messagingSenderId: "482152271600",
  appId: "1:482152271600:web:7ed02e2704c8fb5448bc35",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
