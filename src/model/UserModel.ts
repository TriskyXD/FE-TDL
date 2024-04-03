import {TaskModel} from "./TaskModel";

export interface UserModel{
    id: number;
    name: string;
    email: string;
    taskModel: TaskModel[];

}