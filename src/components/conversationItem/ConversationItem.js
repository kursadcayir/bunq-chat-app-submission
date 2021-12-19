import { useStore } from "../../store";

import './conversationItem.css';

import {humanizeDate} from '../../utils/helper/functions'

const ConversationItem = ({ conversation,currentUser,userList, onSelect, ...props }) => {

    const { name, last_message, members } = conversation;


    let users = userList ?? [] ;
    const currentUserId = currentUser?.id;

    const lastMessageDateStr = humanizeDate(last_message?.sent_at);
    
    const lastSeenDateStr = name ? null: humanizeDate( members.find(({id}) => id !== currentUserId)?.last_seen_at);

    let conversationName = name ?? members.find(({id}) => id !== currentUserId).name;

    let lastTextInChat = conversation?.last_message?.text;

    let lastMessageSender = users.find(user => user.id === conversation?.last_message?.user_id); 


    return (
        <li className="p-3 mb-2" data-asd={lastTextInChat} onClickCapture={() => onSelect(conversation)} {...props}>
            <div className="chat-list-body-chat-name d-flex flex-row align-items-center justify-content-between">
                <span className="con-name" data-testid='testConversationName'><b>{conversationName} </b> </span>
                <span className="con-last-seen">{lastSeenDateStr ? "last seen: " + lastSeenDateStr : ""}</span>  

                <p className="d-none">{lastMessageSender?.name ? `${conversation?.last_message?.user_id === currentUserId ? 'You' : lastMessageSender?.name}: ` : "Messages Empty"}  {lastTextInChat} {lastMessageDateStr}</p>
                <a className="d-none">{lastSeenDateStr ? "last seen: " + lastSeenDateStr : ""}</a>
            </div>
            <div className="chat-list-body-chat-body-content">
                <span>{lastMessageSender?.name ? `${conversation?.last_message?.user_id === currentUserId ? 'You' : lastMessageSender?.name}: ` : "Messages Empty"}  {lastTextInChat}</span>
                <span className="con-last-message-date">{lastMessageDateStr}</span>  
            </div>
        </li>
    )
};
export default ConversationItem;