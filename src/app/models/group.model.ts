import { Course } from './course.model';
import { User } from './user.model';
import { Days_week } from './days_week.model';
export interface Group{
    _id?: string,
    name?:string,
    code?: number,
    key?:string,
    delay: number,
    days_week?:Days_week[],
    emails?:any[],
    students?: User[],
    course?: Course,
    teacher?: User,
    state?:number
};