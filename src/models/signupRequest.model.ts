import mongoose, { Schema } from "mongoose";
import {ISignupRequests} from "../types";
import { getCurrentDateTime } from "../utils/dateFormat";


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
        type: String,
        default: getCurrentDateTime(),
        index: { expires: '48h' }
    }
});

const SignupRequests = mongoose.model<ISignupRequests>('SignupRequests', PUserSchema);
export default SignupRequests;