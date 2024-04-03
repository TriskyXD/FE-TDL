import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {TaskModel} from "../../model/TaskModel";
import {ApiClient} from "../../client/ApiClient";
import {Button, Form, Row} from "react-bootstrap";
import {UserModel} from "../../model/UserModel";

const TaskDetail = () =>{
    const{id} = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState<TaskModel>();
    const [changed, setChanged] = useState<boolean>(false);
    useEffect(() => {
        const numberId = Number(id);
        if (!isNaN(numberId)){
            ApiClient.getTask(numberId).then(task => setTask(task)).catch(err => navigate("/nonono"));
        }else{
            navigate("/notfound")
        }
    }, [id, navigate]);

    const nameChanged = (event: any) => {
        if (task) {
            setChanged(true);
            setTask({...task, name: event.target.value});
        }
    };
    const changeStatus = (event: any) => {
        if (task) {

            setChanged(true);
            setTask({...task, complete: !task.complete});
            console.log(task.complete)
        }

    };
    const descriptionChanged = (event: any) => {
        if (task) {
            setChanged(true);
            setTask({...task, description: event.target.value});
        }
    };

    const saveChanges = () => {
        if (task) {
            ApiClient.updateTask(task).then(() => {
                alert("Změny byly uloženy!")
                navigate("/");
            }).catch((err) => alert(JSON.stringify(err)));

        }
    };

    return(
        <>
            <h2 className="ms-auto me-auto col-lg-6 col-md-12 ">Detail úkolu</h2>
            <Row>
                <div className="ms-auto me-auto   col-lg-6 col-md-12 ">


                    <Form.Group>
                        <Form.Label ><b>Název</b></Form.Label>
                        <Form.Control onChange={nameChanged} value={task?.name}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="mt-2 "><b>Popisek</b></Form.Label>
                        <Form.Control type="text" onChange={descriptionChanged} value={task?.description}/>
                    </Form.Group>
                    <Form.Group>
                        <div className="d-grid gap-2">
                        <Button className="mt-2 " variant={task?.complete ? "danger" : "success"} size="sm"  onClick={changeStatus}>Označit jako {task?.complete ? "nesplněno" : "splněno"}</Button>
                        </div>
                        </Form.Group>


            <Form.Group className="mt-2">
                <div className="d-grid gap-2">
                <Button variant="outline-success" size="lg" onClick={saveChanges}>Uložit změny</Button>
                </div>
            </Form.Group>
                </div>
            </Row>
        </>
    )
}

export default TaskDetail;