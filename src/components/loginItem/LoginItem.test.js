//Login item test is in Login.test.js


import {screen, render, cleanup} from "@testing-library/react";
import LoginItem from "./LoginItem";


it('renders without crashing', () => {
    const {getByTestId}= render(
        <LoginItem users={[{name:"test", id: 1}]} onClick={() => console.log('clicked')}></LoginItem>
     );
     expect(screen.getByTestId('test1')).toBeEnabled();
});