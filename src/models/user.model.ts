import mongoose, { Schema } from "mongoose";
import { IUser, roles } from "../types";




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
        required: true,
        enum: Object.values(roles)
    },
    refreshToken: {
        type: String,
        required: false
    }
});

const Users = mongoose.model<IUser>('Users', userSchema);
export default Users;