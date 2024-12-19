import mongoose, { Schema, Document } from "mongoose";
import { roles } from "../types/enum.type";


interface IUser extends Document {
    username: string;
    email: string;
    hashPassword: string;
    role: roles;
    refreshToken?: string
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hashPassword: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: false
    }
});

const usres = mongoose.model<IUser>('users', userSchema);
export default usres;