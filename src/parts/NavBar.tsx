import React from 'react';
import { Navbar, Container } from "react-bootstrap";

const NavBar: React.FC = () => {
    return (
        <Navbar bg="dark" expand="md" variant="dark" className="mb-5">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        alt=""
                        src={process.env.PUBLIC_URL + '/logo.svg'}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    TO-DO list
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default NavBar;