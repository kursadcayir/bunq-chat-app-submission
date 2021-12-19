

import { useEffect, useState } from "react";

export function pongFetch() {

    let response = null;
    let myHeaders = new Headers();
    myHeaders.append("Accept", "text/plain");
    myHeaders.append("Authorization", "Bearer UX4FufJgtuTmh1rEyOeomBjkJj7QbHmV");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://assignment.bunq.com/api/ping", requestOptions)
        .then(response => response.text())
        .then(result => {console.log(result); response = result;})
        .catch(error => console.log('error', error));

    return response;
}


export  function useUserListFetch() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        let myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", "Bearer UX4FufJgtuTmh1rEyOeomBjkJj7QbHmV");
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
    
        fetch("https://assignment.bunq.com/api/user", requestOptions)
            .then(response => response.text())
            .then(result => {
                let response = JSON.parse(result);
                setUsers(response.data.sort((a, b) => (a.id > b.id) ? 1 : -1));
    
            })
            .catch(error => console.log('error', error));
    }
    , []);
        return users;
}

export  function useConversationListFetch(userId) {
    const [conversations, setConversations] = useState([]);

    useEffect(() => {


        let myHeaders = new Headers();
        myHeaders.append("Accept", "text/plain");
        myHeaders.append("Authorization", "Bearer UX4FufJgtuTmh1rEyOeomBjkJj7QbHmV");
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(`https://assignment.bunq.com/api/user/${userId}/conversation`, requestOptions)
            .then(response => response.text())
            .then(result => {
                let response = JSON.parse(result,'conversation');
                setConversations(response.data);
            })
            .catch(error => console.log('error', error));
    }, [userId !==0]);

    return conversations;

}

