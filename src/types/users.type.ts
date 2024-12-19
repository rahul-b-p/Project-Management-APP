import { Document } from "mongoose";
import { roles } from "./roles.type";

export interface IPUser extends Document {
    username: string;
    email: string;
    hashPassword: string;
    createAt: number
}

export interface IUser extends Document {
    username: string;
    email: string;
    hashPassword: string;
    role: roles;
    refreshToken?: string
}
