


import ReactDom from "react-dom";
import {screen, render, cleanup} from "@testing-library/react";
import MessageItem from "./MessageItem";


it('renders without crashing', () => {

     const div = document.createElement('div');
     const message = {
        "id": 1,
        "user_id": 10,
        "text": "Hello, World!",
        "sent_at": "2021-12-19T11:42:17.000000Z"
    };
    const currentUser = { id: 10, name: "wessel", last_seen_at: "2021-12-19T10:19:46.000000Z" };
    const users = 
    [
        {
            "id": 10,
            "name": "wessel",
            "last_seen_at": "2021-12-19T11:41:41.000000Z"
        },
        {
            "id": 9,
            "name": "sonnya",
            "last_seen_at": "2021-11-25T17:00:02.000000Z"
        },
        {
            "id": 8,
            "name": "nick",
            "last_seen_at": "2021-12-10T18:00:02.000000Z"
        },
        {
            "id": 7,
            "name": "mdemaa",
            "last_seen_at": "2021-12-06T05:00:02.000000Z"
        },
        {
            "id": 6,
            "name": "jordy",
            "last_seen_at": "2021-11-21T02:00:02.000000Z"
        },
        {
            "id": 5,
            "name": "jesper",
            "last_seen_at": "2021-11-22T03:00:02.000000Z"
        },
        {
            "id": 4,
            "name": "hilco",
            "last_seen_at": "2021-12-19T10:24:30.000000Z"
        },
        {
            "id": 3,
            "name": "bram",
            "last_seen_at": "2021-12-19T10:19:43.000000Z"
        },
        {
            "id": 2,
            "name": "andre",
            "last_seen_at": "2021-12-19T10:18:58.000000Z"
        },
        {
            "id": 1,
            "name": "ali",
            "last_seen_at": "2021-12-19T10:41:12.000000Z"
        }
    ];
     ReactDom.render(
        <MessageItem message={message} currentUser={currentUser} userList ={users}/>
, div);
});
//testMessageSender
//testMessageText

it('rendered as an expected', () => {
    const message = {
        "id": 1,
        "user_id": 10,
        "text": "Hello, World!",
        "sent_at": new Date("2021-12-19T11:42:17.000000Z")
    };

    const currentUser = { id: 10, name: "wessel", last_seen_at: "2021-12-19T10:19:46.000000Z" };
    const users = 
    [
        {
            "id": 10,
            "name": "wessel",
            "last_seen_at": "2021-12-19T11:41:41.000000Z"
        },
        {
            "id": 9,
            "name": "sonnya",
            "last_seen_at": "2021-11-25T17:00:02.000000Z"
        },
        {
            "id": 8,
            "name": "nick",
            "last_seen_at": "2021-12-10T18:00:02.000000Z"
        },
        {
            "id": 7,
            "name": "mdemaa",
            "last_seen_at": "2021-12-06T05:00:02.000000Z"
        },
        {
            "id": 6,
            "name": "jordy",
            "last_seen_at": "2021-11-21T02:00:02.000000Z"
        },
        {
            "id": 5,
            "name": "jesper",
            "last_seen_at": "2021-11-22T03:00:02.000000Z"
        },
        {
            "id": 4,
            "name": "hilco",
            "last_seen_at": "2021-12-19T10:24:30.000000Z"
        },
        {
            "id": 3,
            "name": "bram",
            "last_seen_at": "2021-12-19T10:19:43.000000Z"
        },
        {
            "id": 2,
            "name": "andre",
            "last_seen_at": "2021-12-19T10:18:58.000000Z"
        },
        {
            "id": 1,
            "name": "ali",
            "last_seen_at": "2021-12-19T10:41:12.000000Z"
        }
    ];
    render(<MessageItem message={message} currentUser={currentUser} userList={users} />)
    
    expect(screen.getByText(message.text)).toBeInTheDocument();
    expect(screen.getByText("You")).toBeInTheDocument();
    expect(screen.getByText(message.sent_at.toLocaleString())).toBeInTheDocument();
});