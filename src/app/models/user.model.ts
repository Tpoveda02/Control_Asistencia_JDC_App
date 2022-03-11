import { Role } from "./role.model";

export interface User{
    _id ?: string;
    name_user?: string,
    identification_card?:number,
    state?: number,
    password?: string,
    email?: string, 
    full_name?: string,
    role?:Role;
    state_user?: number
    location?: string;
}