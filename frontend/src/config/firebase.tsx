import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
export const firebaseConfig = {
    apiKey: "AIzaSyAkTdmU54-PYiNKU-7bdxOcJBQY7dVis-c",
    authDomain: "tpaweblinkhedin.firebaseapp.com",
    projectId: "tpaweblinkhedin",
    storageBucket: "tpaweblinkhedin.appspot.com",
    messagingSenderId: "503753816583",
    appId: "1:503753816583:web:a1ba407d4c933216d308a2",
    measurementId: "G-0NRL0K92C1"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }