import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA0i5IKO-h9UKbRJm-awcEXQl-VsiTwr-A",
  authDomain: "poverty-abolition.firebaseapp.com",
  projectId: "poverty-abolition",
  storageBucket: "poverty-abolition.appspot.com",
  messagingSenderId: "249833714707",
  appId: "1:249833714707:web:a6f71a259ea4f8e16e7be6",
  measurementId: "G-QRCP8W3150"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(app);
const db = app.firestore();
export {auth ,db};