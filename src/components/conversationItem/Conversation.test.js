import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import renderer from "react-test-renderer";
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup} from "@testing-library/react";


import ConversationItem from './ConversationItem'

it('matches to empty chat snapshot',()=>{

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
    const con= {
        "id": 2,
        "name": "The Nerds",
        "members": [
            {
                "id": 10,
                "name": "wessel",
                "last_seen_at": "2021-12-19T11:42:05.000000Z"
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
            }
        ],
        "last_message": null
    };

    const currentUser = { id: 10, name: "wessel", last_seen_at: "2021-12-19T10:19:46.000000Z" };
    const {getByTestId} = render(<ConversationItem conversation={con} currentUser={currentUser} userList={users} onSelect={() => {console.logi('test')}}/>);
    expect(getByTestId('testConversationName')).toHaveTextContent("The Nerds");
    // we can checck last message date .
});