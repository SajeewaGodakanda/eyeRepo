// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// lahiruge personal db eka
// const firebaseConfig = {
//   apiKey: "AIzaSyBoBVzDDJGK1We7l3KyInJs7Aoag5isM1Y",
//   authDomain: "report-upload-test-1.firebaseapp.com",
//   projectId: "report-upload-test-1",
//   storageBucket: "report-upload-test-1.appspot.com",
//   messagingSenderId: "901673463442",
//   appId: "1:901673463442:web:5d735afd40a5970800804b",
//   measurementId: "G-NEC6GP2SQR"
// };


// udula hadapu email eke db eka
const firebaseConfig = {
  apiKey: "AIzaSyBKI416j9NXKqT9zF4YqMe4SlzztrPgoWg",
  authDomain: "reseach-db-1.firebaseapp.com",
  projectId: "reseach-db-1",
  storageBucket: "reseach-db-1.appspot.com",
  messagingSenderId: "1033467405889",
  appId: "1:1033467405889:web:80c87061216981be4ec8c0",
  measurementId: "G-6XQJNC188L"
};
// modahassa99@gmail.com
// modahasa123


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);