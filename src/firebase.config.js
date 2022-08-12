import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDoLMkEW5gt9TgXZyGzAuHrjL9pqLlCrXQ",
    authDomain: "house-listing-9d928.firebaseapp.com",
    projectId: "house-listing-9d928",
    storageBucket: "house-listing-9d928.appspot.com",
    messagingSenderId: "658524829961",
    appId: "1:658524829961:web:b76a04beb86c05bb91fbd8",
    measurementId: "G-7CBVZ35QQ1"
};

initializeApp(firebaseConfig);
export const db = getFirestore();