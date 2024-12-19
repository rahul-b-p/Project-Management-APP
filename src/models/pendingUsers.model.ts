import mongoose, { Schema } from "mongoose";
import { IPUser } from "../types";


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
    createAt: {
        type: Number,
        default: Date.now(),
        index: { expires: '48h' }
    }
});

const PUsers = mongoose.model<IPUser>('PUsers', PUserSchema);
export default PUsers;