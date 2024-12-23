import mongoose, { Schema } from "mongoose";
import {ISignupRequests} from "../types";


const PUserSchema = new Schema<ISignupRequests>({
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

const SignupRequests = mongoose.model<ISignupRequests>('SignupRequests', PUserSchema);
export default SignupRequests;