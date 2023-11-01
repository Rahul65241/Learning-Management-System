import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAPuCrTwJY1y6l0w05vEdJ0JtUVqb3V_qA",
    authDomain: "lmsystem-5cdb1.firebaseapp.com",
    projectId: "lmsystem-5cdb1",
    storageBucket: "lmsystem-5cdb1.appspot.com",
    messagingSenderId: "522801611555",
    appId: "1:522801611555:web:02d7798fe418c1d5ae0296",
    measurementId: "G-Y9KR7RE5L2"
  };
  
const app = initializeApp(firebaseConfig);

export default app;