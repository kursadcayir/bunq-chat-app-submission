import Chat from "../../components/chat/Chat";
import ConversationList from "../../components/conversationList/ConversationList";

import EmptyChat from './../../components/emptyChat/EmptyChat';
import { useStore } from "../../store";
import './main.css';
const Main = () => {
    const conversationid = useStore(store => store.conversationid);
    return (
        <>
            <div className='position-relative container-fluid d-flex flex-column flex-lg-row'>
                <ConversationList />
                {!conversationid || conversationid === 0 ? <EmptyChat/> : <Chat  />}
            </div>
        </>
    );
}

export default Main;