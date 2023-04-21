import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";


//The Firebase configuration
const app = initializeApp({
    apiKey: "AIzaSyAa8m8jdGb85y-Qzfm2TW1jv2R_-Qq6nCQ",
    authDomain: "cosc4p02-project-a5335.firebaseapp.com",
    projectId: "cosc4p02-project-a5335",
    storageBucket: "cosc4p02-project-a5335.appspot.com",
    messagingSenderId: "941095700018",
    appId: "1:941095700018:web:88000e3b139f089d9ede2b",
    measurementId: "G-W1X36PE2R1"
});

export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app)