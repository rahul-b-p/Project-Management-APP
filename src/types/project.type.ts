import { Document, Types } from "mongoose";



export interface IProject extends Document{
    _id:Types.ObjectId;
    projectName:string;
    description:string;
} 