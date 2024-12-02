
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBFS-ZW2sCIUeAWG2q9JSdI7ly4liueJ5c",
  authDomain: "mrrepoter-blogger.firebaseapp.com",
  projectId: "mrrepoter-blogger",
  storageBucket: "mrrepoter-blogger.appspot.com",
  messagingSenderId: "866768102027",
  appId: "1:866768102027:web:59ae4108a8de968b8e2a8e"
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {
    let user = null;

    await signInWithPopup(auth, provider).then((result) => {
        user = result.user
    })
    .catch((err) =>{
        console.log(err)
    })
    return user;
}