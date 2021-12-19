import { render,cleanup} from "@testing-library/react";
import ReactDom from "react-dom";
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import renderer from "react-test-renderer";
import '@testing-library/jest-dom/extend-expect';
import Main from "./Main";

afterEach(cleanup);

it('should display the Main page', () => {
    const div = document.createElement('div');
    ReactDom.render(
        <BrowserRouter>
    <Main/>
    
    </BrowserRouter>, div);
});


it('matches to empty chat snapshot',()=>{
   const tree = renderer.create(<BrowserRouter><Main/></BrowserRouter>).toJSON();  
   expect(tree).toMatchSnapshot();
});





