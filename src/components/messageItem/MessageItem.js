import './messageitem.css';
import { useStore } from '../../store'

const MessageItem = ({ message , currentUser, userList}) => {
    
    // let currentUser = useStore(store => store.user);
    let messageDate = new Date(message?.sent_at);

    let users =userList

    return(
        <>
            <div className={ message.user_id === currentUser?.id ? "message-item-me w-100 d-flex flex-column align-items-end" : "message-item w-100  d-flex flex-column align-items-start"}>
                {/* <div className="message-item-header w-50"> 
                    
                </div> */}
                <div className="message-item-body w-50 py-2 px-4 mb-3"> 
                <h3 data-testid="testMessageSender">{currentUser.id === message.user_id ? "You": users.find(user => user.id === message.user_id)?.name  }</h3>
                    <p data-testid="testMessageText">{message.text}</p>
                    <span>{messageDate.toLocaleString()}</span>
                </div>
                <div className="message-item-footer w-50"> </div>
            </div>
        </>
    );
}

export default MessageItem;