import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// const { initializeApp } = require("firebase/app");
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
// import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// import { initializeAuth, getReactNativePersistence } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAH1oIeVcfbIp4gcaOpp0tPQdgUXYLQStI",
  authDomain: "finant-dd645.firebaseapp.com",
  projectId: "finant-dd645",
  storageBucket: "finant-dd645.appspot.com",
  messagingSenderId: "911050943661",
  appId: "1:911050943661:web:8ff8f0613984fa00e2ea24",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });
