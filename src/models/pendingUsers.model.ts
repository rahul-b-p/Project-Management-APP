import mongoose, { Schema, Document } from "mongoose";
import { roles } from "../types/enum.type";


interface IPUser extends Document {
    username: string;
    email: string;
    hashPassword: string;
    role: roles;
    createAt: number
}

const PUserSchema = new Schema<IPUser>({
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
        default: roles.user
    },
    createAt: {
        type: Number,
        default: Date.now(),
        index: { expires: '48h' }
    }
});

const PUsers = mongoose.model<IPUser>('PUsers', PUserSchema);
export default PUsers;