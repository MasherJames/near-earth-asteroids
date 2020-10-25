import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDS9ubghTUKusZpaTnT2MHNTSLnUmcdWXc",
  authDomain: "near-earth-objects.firebaseapp.com",
  databaseURL: "https://near-earth-objects.firebaseio.com",
  projectId: "near-earth-objects",
  storageBucket: "near-earth-objects.appspot.com",
  messagingSenderId: "667262040682",
  appId: "1:667262040682:web:74419982418221b0982813",
  measurementId: "G-YF7WZ0CLR4",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
export { firebase };
