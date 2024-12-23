import { Document, Types } from "mongoose";
import { roles } from "./roles.type";

export interface ISignupRequests extends Document {
    username: string;
    email: string;
    hashPassword: string;
    createAt?: number
}

export interface IUser extends Document {
    _id:Types.ObjectId;
    username: string;
    email: string;
    hashPassword: string;
    role: roles;
    refreshToken?: string
}

export interface User {
    _id: Types.ObjectId;
    username: string;
    hashPassword:string;
    email: string;
    role: roles;
    refreshToken?: string
}
