import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useUserListFetch } from '../../hooks/CustomFetchHooks';

import { useStore } from '../../store';

import LoginItem  from './../../components/loginItem/LoginItem';

import './login.css';

const Login = () => {
    const users = useStore(store => store.users);
    const setUsers = useStore(store => store.setUsers);
    const setUser = useStore(store => store.setUser);
    const setConversationid = useStore(store => store.setConversationid);

    const setconversationListFetchFlag = useStore(store => store.setconversationListFetchFlag);


    let navigate = useNavigate();

    const userData = useUserListFetch();

    useEffect(() => {
        setUser(null);
        setConversationid({ conversationid: 0 });
        setconversationListFetchFlag({ conversationListFetchFlag: true });

    }, []);

    useEffect(() => {
        if (userData)
            setUsers(userData)
    }, [userData])

    function handleClick(user) {
        //buraya popup ile emin misiniz diye sorulabilir 
        setUser(user)
        // console.log("worked");
        // navigate(`/conversationlist`);
        navigate(`/main`);

    }

    return (
        <>
            <div className="sign-in-wrapper login-box-bg px-5 p-4">
                <h1> For Login, Please Select Your Profile </h1>
                {users.length === 0 ?
                 <p>Loading</p> :
                  <div className='user-item-wrapper' data-testid='useritemwrapper'>
                    <LoginItem users={users} handleClick={handleClick}/>
                </div>}
            </div>
        </>
    );
}

export default Login;
