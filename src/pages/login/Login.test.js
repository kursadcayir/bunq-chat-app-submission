import ReactDom from "react-dom";
import Login from "./Login";
import LoginItem from "../../components/loginItem/LoginItem";
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import {screen, render, cleanup} from "@testing-library/react";

afterEach(cleanup);
it('should display the login page', () => {
    const div = document.createElement('div');
    ReactDom.render(
        <BrowserRouter>
    <Login/>
    
    </BrowserRouter>, div);
});

it('user listed properly', () => {
   const {getByTestId}= render(
            <LoginItem users={[{name:"test", id: 1}]} onClick={() => console.log('clicked')}></LoginItem>
         );
         expect(screen.getByTestId('test1')).toBeEnabled();

        //   getByTestId("test1");
});






