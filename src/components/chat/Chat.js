
import MessageItem from '../messageItem/MessageItem';
import { useEffect, useState, useRef } from "react";

import { useStore } from '../../store';

import Modal from '../modal/Modal';
import "./chat.css"

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [renderMessagesContent, setRenderMessagesContent] = useState(true);
    const [renderModal, setRenderModal] = useState(false);
    const [typedMessage, setTypedMessage] = useState('');
    const [pending, setPending] = useState(false);
    const [renderChat, setRenderChat] = useState(true);


    let currentUser = useStore(store => store.user);
    let users = useStore(store => store.users);
    let conversationId = useStore(store => store.conversationid);
    const setConversationid = useStore(store => store.setConversationid);

    let setconversationListFetchFlag = useStore(store => store.setconversationListFetchFlag);
    const conversationListFetchFlag = useStore(store => store.conversationListFetchFlag);

    
    let [currentConversation, setCurrentConversation] = useState({name: ''});
    const inputToFocus = useRef(null);
    const spanForScroll = useRef(null);

    let conversationName = currentConversation.name === null || currentConversation === "" ? currentConversation.members.find(({id}) => id !== currentUser.id).name : currentConversation.name;

    let lastMessageDate = currentConversation?.last_message?.sent_at ? new Date(currentConversation?.last_message?.sent_at) : null;
    let lastMessageDateStr = lastMessageDate !== null ? lastMessageDate.toLocaleString() : null

    useEffect(() => {
        let myHeaders = new Headers();
        myHeaders.append("Accept", "text/plain");
        myHeaders.append("Authorization", "Bearer UX4FufJgtuTmh1rEyOeomBjkJj7QbHmV");
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`https://assignment.bunq.com/api/user/${currentUser.id}/conversation/${conversationId}`, requestOptions)
            .then(result => result.json())    
            .then(result => {
                // console.log("read Conversation info", result);
                setCurrentConversation( result.data);
            })
            .catch(error => console.log('error', error));


        fetch(`https://assignment.bunq.com/api/user/${currentUser.id}/conversation/${conversationId}/message`, requestOptions)
            .then(result => result.json())    
            .then(result => {
                // console.log(result);
                setMessages(result.data.reverse());
                // setRenderMessagesContent(renderMessagesContent => !renderMessagesContent);
            })
            .catch(error => console.log('error', error));

    }, [renderMessagesContent,conversationId]);


    useEffect(() => {
        setRenderChat(true);

    } , [conversationId]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRenderMessagesContent(renderMessagesContent => !renderMessagesContent);
        }, 10000);

        return () => clearInterval(interval);
    }, []);


    useEffect( () => {
        inputToFocus.current.focus();
        spanForScroll.current.scrollIntoView() 
    } )

    function handleSubmit(e) {
        // or directly
        let message = typedMessage;
        if (!typedMessage || pending) return;
        setPending(true);
        
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", "Bearer UX4FufJgtuTmh1rEyOeomBjkJj7QbHmV");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "text": message
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`https://assignment.bunq.com/api/user/${currentUser.id}/conversation/${conversationId}/message`, requestOptions)
            .then(response => response.text())
            .then(result => {
                setTypedMessage('');
                setRenderMessagesContent(renderMessagesContent => !renderMessagesContent);
                setconversationListFetchFlag( { conversationListFetchFlag: conversationListFetchFlag ===true ? false : true });
                
            })
            .catch(error => console.log('error', error))
            .finally(() => {
                setPending(false)
            });
    }
    const handleClick = (e) => {
        setRenderChat(renderChat => !renderChat);
        setConversationid({ conversationid: 0 });

        };

    const handleInfoClick = (e) => {
        setRenderModal(true);
    }
    const renderModalContent = () => {

        if (renderModal)
            return (
                <Modal
                    onClose={() => { setRenderModal(false) }}
                    isOpen={renderModal}
                    className={`Chat Detail`}
                    title={'Chat Detail'}
                >
                    <div className="chat-detail-wrapper">
                        <h3>{currentConversation.name}</h3>
                        <label>Chat Members</label>
                        <ul>{currentConversation.members?.map(member => {return <li key={member.id}>{member.name}</li> } )}</ul>
                        <p>Sender Name : {currentConversation.members ? currentConversation.members.find(m => { return m.id === currentConversation.last_message?.user_id })?.name : ""}</p>
                        <p>Last Message : {currentConversation.last_message?.text}</p>
                        <p>Last Message Date : {lastMessageDateStr}</p>
                    </div>
                </Modal>
            )
    }


    const checkEnterKey = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            // Trigger the button element with a click
            document.getElementById("sendMessageButton").click();
          }
    }

    return (
        <> {renderChat && 
            <div className="chat-wrapper chat-box-bg px-4 py-5 pt-3 mt-lg-0 col-12 col-lg-9">
            <div className="ds-none"> <button className="btn back mb-2 d-lg-none" type='button' onClick={handleClick} ></button> </div>

                <div className="chat-header d-flex flex-row justify-content-between px-3 py-2">
                    
                    <h1 data={conversationName}>
                     Chat { conversationName}

                    </h1>
                    {conversationName !== null && <span onClick={handleInfoClick}> Chat Info</span>}
                </div>

                <div className="chat-body px-1">
                    {messages.map(message => (
                        <MessageItem key={message.id} message={message} currentUser={currentUser} userList ={users}/>
                    ))}
                    <span id='spanForScroll' ref={spanForScroll}></span>
                </div>

                <div className="chat-footer">
                    <div className="d-flex">
                        <input className="w-100 px-3 me-2" ref={inputToFocus} value={typedMessage} autoComplete='off' onKeyUp={(e) =>{ checkEnterKey(e); }} onChange={(e) => setTypedMessage(e.target.value)} type="text" placeholder="Type a message" name="message" id='message' />
                        {pending && <span className="Sending" id='' disabled >Sending...</span> }
                        {!pending && <button className="btn" id='sendMessageButton' tabIndex={0} onClick={handleSubmit}></button>}
                    </div>
                </div>
                {renderModalContent()}
            </div>
        
        }

        </>
    );
}

export default Chat;
