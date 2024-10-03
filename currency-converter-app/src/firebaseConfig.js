import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyDqB4-wH1FFxDhQ3ug1OGPxgzfr9YeS6vs",
    authDomain: "currency-converter-app-32008.web.app",
    projectId: "currency-converter-app-32008",
    storageBucket: "gs://currency-converter-app-32008.appspot.com",
    messagingSenderId: "382242154182",
    appId: "BO-LfDwWiyVPC4FdgwnzAdjRX5e1VGq1WMx9ca-IDg8BBEEjOKXaZqiu1dJm104R6NiLBqWbhQO1qB8E9E_NfgI",
};
 
//initialize firebase 
const app = initializeApp(firebaseConfig);

//initialize firebase authentication
const auth = getAuth(app);

//initialize Firebase auth
const db = getFirestore

export { db, auth };
