import React, {useEffect, useState} from "react";
import {ApiClient} from "../../client/ApiClient";
import {TaskModel} from "../../model/TaskModel";
import {Button, Dropdown, Form, Modal, Stack} from "react-bootstrap";
import TaskRow from "./TaskRow";
import {NewTaskModel} from "../../model/NewTaskModel";

const Tasks = () => {
    const [tasks, setTasks] = useState<TaskModel[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [newTask, setNewTask] = useState<NewTaskModel>(new NewTaskModel("", "", 0));
    const [nameClass, setNameClass] = useState<string>("");
    const [descriptionClass, setDescriptionClass] = useState<string>("");
    const [userIdClass, setUserIdClass] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sortOption, setSortOption] = useState<string>("");


    useEffect(() => {
        ApiClient.getTasks().then(data => setTasks(data));


    }, []);
    const openModal = (): void => {
        setShowModal(true);
    };


    const closeModal = (): void => {
        setShowModal(false);
    };

    const nameChanged = (event: any): void => {
        const task = new NewTaskModel(newTask.name, newTask.description, newTask.user_id);
        task.name = event.target.value;
        setNewTask(task);
    };

    const descriptionChanged = (event: any): void => {
        const task = new NewTaskModel(newTask.name, newTask.description, newTask.user_id);
        task.description = event.target.value;
        setNewTask(task);
    };
    const userIdChanged = (event: any): void => {
        const task = new NewTaskModel(newTask.name, newTask.description, newTask.user_id);
        task.user_id = event.target.value;
        setNewTask(task);
    };

    const createTask = (): void => {
        setNameClass("");
        setDescriptionClass("");
        setUserIdClass("");

        if (newTask.description && newTask.name && newTask.user_id && newTask.name.trim().length > 0) {
            ApiClient.createTask(newTask).then(task => {
                const tasksCopy = tasks.slice();
                tasksCopy.push(task);
                setTasks(tasksCopy);
                setNewTask(new NewTaskModel("", "", 0));
                closeModal();
                window.location.reload();

            });
        } else {
            if (!newTask.name || newTask.name.trim().length === 0) {
                setNameClass("border border-danger");
            }
            if (!newTask.description || newTask.description.trim().length === 0) {
                setDescriptionClass("border border-danger");
            }
            if (isNaN(newTask.user_id) || newTask.user_id <= 0) {
                setUserIdClass("border border-danger");
                return;
            }


        }

    };

    const deleteTask = (id: number) => {
        ApiClient.deleteTask(id).then(() => {
            setTasks(tasks.filter(x => x.id !== id));
        }).catch(err => alert(err));
    };

    const filterTasks = (task: TaskModel) => {
        const lowercaseSearchTerm = searchTerm.toLowerCase();
        return (
            task.name.toLowerCase().includes(lowercaseSearchTerm) ||
            task.description.toLowerCase().includes(lowercaseSearchTerm)
        );
    };

    const handleSortOptionChange = (option: string): void => {
        setSortOption(option);
        ApiClient.getSortedTasks(option).then(sortedTasks => {
            setTasks(sortedTasks);
        }).catch(err => alert(err));
    };


    return (
        <>
            {/*JSON.stringify(tasks)*/}
            <Stack className="mb-3 mt-3" direction="horizontal" gap={1}>
                <h1>Seznam úkolů</h1>
                <Button variant="success" size="lg" className="ms-auto mb-2" onClick={openModal}>
                    +
                </Button>
            </Stack>
            <Stack direction="horizontal" gap={1}>

                <Dropdown className="mb-2">
                    <Dropdown.Toggle variant="outline-primary" id="sort-dropdown">
                        Řadit podle: {sortOption === "nameAsc" || sortOption === "nameDesc" ? "Názvu" : "Popisku"}
                        {sortOption.includes("Asc") ? " (A-Z)" : " (Z-A)"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item active={sortOption === "TASK_NAME_ASC"}
                                       onClick={() => handleSortOptionChange("TASK_NAME_ASC")}>
                            Název A-Z
                        </Dropdown.Item>
                        <Dropdown.Item active={sortOption === "TASK_NAME_DESC"}
                                       onClick={() => handleSortOptionChange("TASK_NAME_DESC")}>
                            Název Z-A
                        </Dropdown.Item>
                        <Dropdown.Item
                            active={sortOption === "DESCRIPTION_ASC"}
                            onClick={() => handleSortOptionChange("DESCRIPTION_ASC")}
                        >
                            Popisek A-Z
                        </Dropdown.Item>
                        <Dropdown.Item
                            active={sortOption === "DESCRIPTION_DESC"}
                            onClick={() => handleSortOptionChange("DESCRIPTION_DESC")}
                        >
                            Popisek Z-A
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>


                <div className="ms-auto mb-2">
                    <Form.Control
                        type="text"
                        placeholder="Vyhledat..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>


            </Stack>
            {tasks.filter(filterTasks).map((task) => (
                <TaskRow task={task} key={task.id} delete={deleteTask}/>
            ))}


            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Nový úkol</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label><b>Název:</b></Form.Label>
                            <Form.Control className={nameClass} type="text" onChange={nameChanged}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label><b>Popisek:</b></Form.Label>
                            <Form.Control className={descriptionClass} type="text" onChange={descriptionChanged}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label><b>ID uživatele:</b></Form.Label>
                            <Form.Control className={userIdClass} type="number" min="0" onChange={userIdChanged}/>

                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={closeModal}>
                        Zavřít
                    </Button>
                    <Button variant="success" onClick={createTask}>
                        Uložit změny
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Tasks;