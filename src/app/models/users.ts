import { user_types } from './user_types';
export class users{
    id: number;
    username:string;
    password:string;
    user_type:user_types;
    first_name:string;
    last_name:string;
    phone:string;
    email:string;
    avatar:string;
    active:boolean;
    token : string;
    constructor(){};
}