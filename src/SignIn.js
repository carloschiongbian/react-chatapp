import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const SignIn = () => {

    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const googleSignIn = () => {

    
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(result);
            console.log(user);
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            console.log(errorCode);
            const errorMessage = error.message;
            console.log(errorMessage);
            // The email of the user's account used.
            const email = error.email;
            console.log(email);
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    return (
        <>
            <button type="button" onClick={() => googleSignIn()}>Sign In</button>
        </>
    );
}
 
export default SignIn;