import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useConversationListFetch } from "../../hooks/CustomFetchHooks";
import ConversationItem from "../conversationItem/ConversationItem";
import './ConversationList.css';
import Modal from '../modal/Modal';
import { useStore } from "../../store";

const ConversationList = () => {
    let navigate = useNavigate();

    const [conversations, setConversations] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [chatNameField, setChatNameField] = useState(false);
    const [selectedUsersForChatCreation, setSelectedUsersForChatCreation] = useState([]);

    const [filteredConversations, setFilteredConversations] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    const currentUser = useStore(store => store.user);
    const users = useStore(store => store.users);

    const setConversationid = useStore(store => store.setConversationid);

    const conversationListFetchFlag = useStore(store => store.conversationListFetchFlag);
    
    let data = useConversationListFetch(currentUser?.id);

    useEffect(() => {
        // console.log('calistim',data);
         setConversations(data);
         
    },[data]);
    useEffect(() => { }, [conversations]);


    function handleClick(conversation) {
        
        setConversationid({ conversationid: 0 });
        setConversationid({ conversationid: conversation.id });

    }

    const handleNavigationClick = () => {
        navigate(-1);
    };

    const handleinputChange = (event) => {
        let selectedUsers = [...selectedUsersForChatCreation];
        let userId = event.currentTarget.getAttribute('data-user-id');
        if (event.currentTarget.checked === true) {
            //add element to array
            selectedUsers.push(userId);
        }
        else {
            //remove element from array
            selectedUsers = selectedUsers.filter(userIteratorId => userIteratorId !== userId);
        }

        if (selectedUsers.length > 1) {
            // console.log(selectedUsers.length)
            setChatNameField(true);
            // console.log("onetomany");
        }
        else {
            // console.log("onetoone");
            setChatNameField(false);
        }
        setSelectedUsersForChatCreation(selectedUsers);

    }

    const createChat = () => {
        if (chatNameField === true && document.getElementById("groupChatName").value === "") {
            alert("Chat Name required");
            return;
        }
        if (chatNameField === false && selectedUsersForChatCreation.length === 0) {
            alert("Select at least one user");
            return;
        }

        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", "Bearer UX4FufJgtuTmh1rEyOeomBjkJj7QbHmV");
        myHeaders.append("Content-Type", "application/json");

        var reqModel = {};
        if (chatNameField === true) {
            reqModel.name = document.getElementById("groupChatName").value;
        }
        reqModel.user_ids = [...selectedUsersForChatCreation];
        var raw = JSON.stringify(reqModel);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`https://assignment.bunq.com/api/user/${currentUser.id}/conversation`, requestOptions)
            .then(response => response.text())
            .then(result => {
                // console.log(result);
                let response = JSON.parse(result);
                setShowModal(false);
                setSelectedUsersForChatCreation([]);
                setConversations([response.data,...conversations] ) 
            })
            .catch(error => console.log('error', error));
    }

    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
        if (searchInput !== '') {
            const filteredData = conversations.filter((item) => {
                let conversationName = item.name;
                let userName = item.members.find(member => member.id !== currentUser.id).name;
                let str = '';
                str += conversationName ? conversationName : '';
                str += userName ? userName : '';

                return str.toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredConversations([...filteredData])
        }
        else {
            setFilteredConversations([...conversations])
        }
    }

    //chat item da user ve group itemlari icin info alani yapip converstation read ve user read cagirilacak 
    const renderItems = (conversations) => {
        return (
            <ul className="ms-0 ps-0">
                {conversations?.map(conversation => (
                    <ConversationItem 
                        key={conversation?.id}
                        conversation={conversation}
                        currentUser = {currentUser}
                        userList = {users}

                        onSelect={handleClick} 
                    />
                ))}
            </ul>
        );
    }
    const renderModalContent = () => {

        return (
            <>
                {showModal && <Modal
                    onClose={() => { setShowModal(false); setSelectedUsersForChatCreation([]); setChatNameField(false); }}
                    isOpen={showModal}
                    className={"addChat"}
                    test={'meraba'}
                    title={'Add Chat'}
                >
                    <div className="addChat-body">
                        <p className="d-none ">Select People For Chat Creation</p>
                        <div className="d-flex justify-content-between align-items-center">
                            {chatNameField && <input type='text' name='groupChatName' id='groupChatName' placeholder="Chat Name" class="w-100 me-3 py-2 px-2" ></input>}
                            <button className="btn btn-create-chat" type="button" onClick={createChat} > Create </button>
                        </div>
                    </div>

                    <ul id="create-chat">
                        {users.map(user => {

                            if (user.id !== currentUser.id) {
                                return (
                                    <li key={user.id + user.name}>
                                        <input type='checkbox' name='inpUserCheckbox' data-user-id={user.id} data-user-name={user.name} onChange={handleinputChange} ></input>
                                        {user.name}
                                    </li>
                                )
                            }
                            return null;
                        })}
                    </ul>
                </Modal>}
            </>
        )
    }
    return (
        <>
            <div className="chat-list chat-box-bg px-4 py-3 col-12 col-lg-3 me-4 ">
            <div className='button-userinfo-wrapper d-flex justify-content-between align-items-center pb-2 mb-4' > 
            <button type='button' className="btn back" onClick={handleNavigationClick} ></button> 
            {currentUser && currentUser.name && <label style={{ textTransform: "uppercase", fontSize : 12} }>You are {currentUser.name} </label> }
            <button type='button' className="btn add-chat" onClick={() => { setShowModal(true) }}></button>
            </div>

                <div className="chat-list-header">
                    {/* <h1>Chats</h1> */}
                    <div className="chat-list-search-div mx-1 mb-3">
                    <input type="text" className="chat-list-search w-100" placeholder="Search" onChange={(e) => searchItems(e.currentTarget.value)} />
                    </div>
                </div>
                <div className="chat-list-body px-1">
                    <>
                        {conversations.length === 0 && <p>Empty Chat</p>}
                        {
                            searchInput.length > 1 ? renderItems(filteredConversations) : renderItems(conversations)
                        }
                    </>
                </div>
                <div className="chat-list-footer">
                   
                </div>

                {renderModalContent()}
            </div>
        </>);
}
export default ConversationList;

