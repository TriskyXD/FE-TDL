import {TaskModel} from "../../model/TaskModel";
import {Button, Card, Stack,} from "react-bootstrap";
import React from "react";
import "./Tasks";
import {useNavigate} from "react-router-dom";


const TaskRow = (params: { task: TaskModel, delete: (id: number) => void }) => {

    const navigate = useNavigate();
    const goToDetail = (id: number) => {
        navigate("/tasks/" + id);
    };


    return (
        <div>
            <Card>
                <Stack direction="horizontal" gap={2}>
                    <Stack direction="vertical" gap={0}>
                        <span className="ms-2">
                        <b>{params.task.name}</b><br/>
                            {params.task.description}<br/>
                            {params.task.complete ? <span style={{color: 'green'}}>SPLNĚNO</span> :
                            <span style={{color: 'red'}}>NESPLNĚNO</span>}<br/>
                            {params.task.userName}<br/>
                        </span>
                    </Stack>

                    <Button className="ms-auto me-2" variant="dark" size="lg"
                            onClick={() => goToDetail(params.task.id)}>Upravit</Button>
                    <Button className="ms-auto me-2" variant={"danger"} size="lg"
                            onClick={() => params.delete(params.task.id)}>Smazat</Button>
                </Stack>
            </Card>
        </div>
    );
};

export default TaskRow;