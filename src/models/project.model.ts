import mongoose, { Schema } from "mongoose";
import { IProject } from "../types";
import { getCurrentDateTime } from "../utils/dateFormat";




const projectSchema = new Schema<IProject>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users',
    },
    projectName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createAt: {
        type: String,
        default: getCurrentDateTime(),
    },
});

const Projects = mongoose.model<IProject>('Projects', projectSchema);
export default Projects;