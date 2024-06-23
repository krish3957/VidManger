import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD6IAfqpbI_TyFbqKU682sDt-x8hu8elLs",
    authDomain: "hazel-tea-426110-m5.firebaseapp.com",
    projectId: "hazel-tea-426110-m5",
    storageBucket: "hazel-tea-426110-m5.appspot.com",
    messagingSenderId: "754631752264",
    appId: "1:754631752264:web:8d63343a9c9ea42295f67d",
    measurementId: "G-ENW6RT3K4L"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const managerProvider = new GoogleAuthProvider();


provider.addScope("https://www.googleapis.com/auth/youtube");
provider.addScope("https://www.googleapis.com/auth/youtube.readonly");
provider.addScope("https://www.googleapis.com/auth/identitytoolkit");
export { auth, provider, managerProvider };
