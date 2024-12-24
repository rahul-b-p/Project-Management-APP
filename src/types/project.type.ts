import { Document, Types } from "mongoose";



export interface IProject extends Document{
    _id:Types.ObjectId;
    userId:string;
    projectName:string;
    description:string;
    createAt:number;
} 