import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Tasks from "./pages/tasks/Tasks";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import TaskDetail from "./pages/tasks/TaskDetail";
//TODO udělat nav samostatně

function App() {
    return (
        <>

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
            <Container>
                <Routes>
                    <Route path="/" element={<Tasks/>}/>
                    <Route path="/tasks/:id" element={<TaskDetail/>}/>
                    <Route path="*" element={<h2>Stránka nebyla nalezena!</h2>}/>
                </Routes>
            </Container>

        </>
    );
}

export default App;
