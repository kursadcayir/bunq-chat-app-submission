import { render,screen } from "@testing-library/react"
import Modal from './Modal'

it( "The Modal SnapShot", () => {
    let testMessage = "THIS IS TEST CASE";
    render( <Modal isOpen={true} className={'test'} onClose={ () => {console.log("test")}}>  {testMessage} </Modal>  );
    expect(screen.getByText(testMessage)).toMatchSnapshot();
    expect(screen.getByText(testMessage)).toBeInTheDocument();

} )