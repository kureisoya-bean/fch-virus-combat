// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

let firebaseConfig = {
  apiKey: "AIzaSyCJ1gkSn-aZQA5qbHxPlCuav1olUeEX2MU",
  authDomain: "co-make-forkwell.firebaseapp.com",
  databaseURL: "https://co-make-forkwell.firebaseio.com",
  projectId: "co-make-forkwell",
  storageBucket: "co-make-forkwell.appspot.com",
  messagingSenderId: "103415827576",
  appId: "1:103415827576:web:82e4f79fccd8f7e85db18d",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
