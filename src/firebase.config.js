import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyBYv18uAsQXdhQS8Jz7lp32N8gb_fkQKWU",
//   authDomain: "maltimart-b139f.firebaseapp.com",
//   projectId: "maltimart-b139f",
//   storageBucket: "maltimart-b139f.appspot.com",
//   messagingSenderId: "953299853447",
//   appId: "1:953299853447:web:0d4860c5aaa02476cc9822"
// };
const firebaseConfig = {
  apiKey: "AIzaSyBYv18uAsQXdhQS8Jz7lp32N8gb_fkQKWU",
  authDomain: "maltimart-b139f.firebaseapp.com",
  projectId: "maltimart-b139f",
  storageBucket: "maltimart-b139f.appspot.com",
  messagingSenderId: "953299853447",
  appId: "1:953299853447:web:0d4860c5aaa02476cc9822"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const adminUser = ["admin1@gmail.com", "vanthinh@gmail.com"];
export default app;