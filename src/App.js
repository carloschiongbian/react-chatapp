import "./public/css/site_layout/styles.css";
import ChatBox from "./components/chatBox";
import Config from "./config";
import GoogleLogo from "./public/images/icons8-google-48.png";
import { useState } from "react";
import { addDoc, getDocs, query, getFirestore, collection } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signInWithRedirect, getRedirectResult, GoogleAuthProvider, signOut } from "firebase/auth";

function App() {
 
  const firebaseApp = initializeApp(Config);
  const auth = getAuth();
  const firestore = getFirestore(firebaseApp);
  const provider = new GoogleAuthProvider();

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  

  const addUserToMemberList = (memberName, memberEmail, profileImage) => {

    const chatMembersCollection = collection(firestore, "chat_members");
    addDoc(chatMembersCollection, {
      member_name: memberName,
      email: memberEmail,
      profile_image: profileImage
    });

    let test = document.getElementById("display");
    test.scrollTop = test.scrollHeight;
  }

  const verifyEmailExists = async () => {
    const verifyUserQuery = query(collection(firestore, 'chat_members')); 
    const memberListSnapshot = await getDocs(verifyUserQuery);

    return memberListSnapshot.docs.map((snapshot) => 
      snapshot.data()
    );
  }

  const googleSignIn = () => {    
    
    signInWithPopup(auth, provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      let userResult = result.user;
      
      setUser(userResult);
      setUsername(user.displayName);
      setProfileImage(user.photoURL);
      setIsSignedIn(true);
      
      verifyEmailExists().then((documents) => { 
        const temp = documents.filter(docs => docs.email === user.email);
        console.log(temp);
        if(temp.length === 0){
          addUserToMemberList(user.displayName, user.email, user.photoURL);
        } else if (temp[0].email === user.email) {
          console.log("User has already been added to the list");
        }
      }).catch(error => { console.log(error) });

    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);

      console.log(errorCode);
      console.log(errorMessage);
      console.log(email);
    });
  }

  const googleSignOut = () => {
    
    signOut(auth).then((response) => {
      console.log(response);
      setIsSignedIn(false);
      // Sign-out successful.
    }).catch((error) => {
      console.log(error);
      // An error happened.
    });
  }

  return (
    <>
      { isSignedIn === false &&
        <div className="App-signIn-container">            
          <div className="App-signIn">
            <h1>Join the chat</h1>
            <button onClick={() => googleSignIn()} id="signin-btn">
              <img src={GoogleLogo} alt="signin-logo" />
            </button>
          </div>  
        </div>
      } 

      { isSignedIn === true &&
        <div className="signedIn-UI">
          <ChatBox username = {username} profileImage = {profileImage} googleSignOut = {googleSignOut} />
        </div>
      }
    </>
  );
}

export default App;
