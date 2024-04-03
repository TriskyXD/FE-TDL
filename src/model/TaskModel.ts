import {UserModel} from "./UserModel";
export interface TaskModel {
    id: number;
    name: string;
    description: string;
    complete: boolean;
    user: UserModel;
    userName: string;
    user_id: number;

}