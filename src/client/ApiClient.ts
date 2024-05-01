import {TaskModel} from "../model/TaskModel";
import {NewTaskModel} from "../model/NewTaskModel";
import {UserModel} from "../model/UserModel";
import Tasks from "../pages/tasks/Tasks";

export class ApiClient{
    public static async getTasks():Promise<TaskModel[]>{
        const response = await fetch("http://localhost:8080/tasks");
        if(response.ok){
            return await response.json();
        }
        throw new Error(await response.json());
    }

    public static async getTask(id: number):Promise<TaskModel>{
        const response = await fetch("http://localhost:8080/tasks/" + id);
        if(response.ok){
            return await response.json();
        }
        throw new Error(await response.json());
    }

    //
    private static newCompleteStatus: boolean;
    public static async createTask(newTask: NewTaskModel):Promise<TaskModel>{
        const task = {name: newTask.name, description: newTask.description, user: {id: newTask.user_id}} as TaskModel;
        const response = await fetch("http://localhost:8080/tasks", {
            method: "POST",
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        });
        if(response.ok){
            return await response.json();
        }
        throw new Error(await response.json());
    }


    public static async updateTask(task: TaskModel): Promise<void> {

        const response = await fetch("http://localhost:8080/tasks",
            {
                method: "PUT",
                body: JSON.stringify(task),
                headers:{
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
            });
        if(response.ok){
            return;
        }
        throw new Error(JSON.stringify(await response.json()));
    }



    public static async deleteTask(id: number):Promise<void>{
        const response = await fetch("http://localhost:8080/tasks/" + id, {
            method: "DELETE",

            headers: {
                "Content-Type": "application/json"
            },
        });
        if(response.ok){
            return;
        }
        throw new Error(JSON.stringify(await response.json()));
    }


    public static async getSortedTasks(sortOption: string): Promise<TaskModel[]> {
        const response = await fetch(`http://localhost:8080/tasks/sorted?sort=${sortOption}`);
        if(response.ok){
            return await response.json();
        }
        throw new Error(await response.json());
    }


}


