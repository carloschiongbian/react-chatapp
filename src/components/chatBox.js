import MessageCard from "./messageCard";
import MemberListCard from "./memberListCard";
import SendButton from "../../src/public/images/send.png";
import SignOut from "../../src/public/images/log-out.png";
import { useState, useEffect } from "react";
import { 
  getFirestore, 
  addDoc, 
  collection, 
  query, 
  orderBy,
  onSnapshot 
} from "firebase/firestore";

const ChatBox = ({username, profileImage, googleSignOut}) => {

  const [chat, setChat] = useState([]);
  const [membersList, setMembersList] = useState([]);
  const [loading, isLoading] = useState(true);

  const firestore = getFirestore();
  const chat_collection = collection(firestore, "chat");
  const chatCollectionQuery = query(collection(firestore, 'chat'), orderBy("date"));
  const membersListQuery = query(collection(firestore, 'chat_members'), orderBy("member_name"));

  useEffect(() => {

    onSnapshot(chatCollectionQuery, (collectionSnapshot) => {  
      let document = collectionSnapshot.docs;      
      setChat(document.map((document) =>  document.data() )); /* we need to map the snapshot in order to get the values from each document */
    });

    onSnapshot(membersListQuery, (collectionSnapshot) => {  
      let document = collectionSnapshot.docs;
      setMembersList(document.map((document) =>  document.data() )); /* we need to map the snapshot in order to get the values from each document */
    });

  }, []);

  //adding a new document (in this context, a new message)
  const sendMessageToChat = () => {
    let message = document.getElementById("message").value;
  
    addDoc(chat_collection, {
      date: new Date(),
      message: message,
      name: username,
      profile_image: profileImage
    }).then(() => {
      console.log("Message sent.");
    }).catch((error) => {
      console.log(error);
    });
  
    document.getElementById("message").value = "";
  }
  
  return (
    <div className="App-chatbox">
      <div className="chat-members">
        <div className="list">
          <MemberListCard members = {membersList} />
        </div>

        <div className="user-signout">
          <button onClick={googleSignOut} id="signout-btn" >
            <img src={SignOut} alt="Signout" />
          </button>
        </div>
      </div>
            
      <div className="chat-UI">
        <div className="chat-display" id="display">
          { (chat.length === 0 && loading) && <div className="loading-message">...LOADING...</div> }
          <MessageCard chatData = {chat} />
        </div>
        
        <div className="message-input">
          {/* <h1>message input</h1> */}
          <input type="text" name="message" id="message" placeholder="Enter message" />
          <button type="button" onClick={() => sendMessageToChat()}>
            <img src={SendButton} alt="send" /> 
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;