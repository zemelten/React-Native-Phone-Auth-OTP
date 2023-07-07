
import firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyA4EJT6PTHFmEomQLAspKkT8oelNtxSqjg",
  authDomain: "otpauth-e38d9.firebaseapp.com",
  databaseURL: "https://otpauth-e38d9-default-rtdb.firebaseio.com",
  projectId: "otpauth-e38d9",
  storageBucket: "otpauth-e38d9.appspot.com",
  messagingSenderId: "819709886273",
  appId: "1:819709886273:web:8241794048c38e70b56bc0",
  measurementId: "G-6CKYH7WSPE"
};
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
export default firebase;
