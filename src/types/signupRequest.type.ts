import { Types } from "mongoose";


export interface ISignupRequests extends Document {
    _id: Types.ObjectId;
    username: string;
    email: string;
    hashPassword: string;
    createAt: string
}


export type SignUpRequestToUse ={
    _id: Types.ObjectId;
    username: string;
    email: string;
    createAt: string
}