import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Tasks from "./pages/tasks/Tasks";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap";
import TaskDetail from "./pages/tasks/TaskDetail";
import NavBar from "./parts/NavBar";


function App() {
    return (
        <>
            <NavBar/>
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
