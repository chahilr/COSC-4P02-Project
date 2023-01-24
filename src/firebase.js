
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyAa8m8jdGb85y-Qzfm2TW1jv2R_-Qq6nCQ",
  authDomain: "cosc4p02-project-a5335.firebaseapp.com",
  projectId: "cosc4p02-project-a5335",
  storageBucket: "cosc4p02-project-a5335.appspot.com",
  messagingSenderId: "941095700018",
  appId: "1:941095700018:web:88000e3b139f089d9ede2b",
  measurementId: "G-W1X36PE2R1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app);