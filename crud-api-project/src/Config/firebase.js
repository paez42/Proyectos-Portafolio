import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyA6UDuweECHPiuVTIBxQQ857T5zSJkiyB8",
    authDomain: "proyect-crud-auth.firebaseapp.com",
    projectId: "proyect-crud-auth",
    storageBucket: "proyect-crud-auth.appspot.com",
    messagingSenderId: "367485568787",
    appId: "1:367485568787:web:90db52d3639339f0b1bce6",
    measurementId: "G-LQ9HEBHVEB"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const login = ({ email, password }) =>
  signInWithEmailAndPassword(auth, email, password);


export const logout = () => {
    return signOut(auth);
};