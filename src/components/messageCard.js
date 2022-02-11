import '../public/css/components/messageCard/styles.css';

const MessageCard = ({chatData}) => {

    return (
        <>
        {chatData.length > 0 &&
            chatData.map((chatData, index) => {
                
                return (
                    <div className="message-data" id="message-data" key={index}>

                        {/* <div className="message-card"> */}
                            <div className="profile-image">
                                <img src={chatData.profile_image} alt="profile-pic" />
                            </div>
                        {/* </div> */}

                        <div className="message-card">
                            <span className="user-name"> {chatData.name} </span>
                        
                            <div className="message">
                                <p> {chatData.message} </p>
                            </div>
                        </div>
                    </div>
                );
            })
        }
        </>
    );
}
 
export default MessageCard;