import { Document, Types } from "mongoose";
import { roles } from "./roles.type";


export interface IUser extends Document {
    _id:Types.ObjectId;
    username: string;
    email: string;
    hashPassword: string;
    role: roles;
    refreshToken?: string
}

export interface UserToUse{
    _id: string;
    username: string;
    email: string;
    role: roles;
    refreshToken?: string
}



export interface UserToSave{
    username:string,
    email:string,
    hashPassword:string,
    role:roles
}
