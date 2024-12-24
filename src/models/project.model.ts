import { model, Schema } from "mongoose";
import { IProject } from "../types/project.type";




const projectSchema = new Schema<IProject>({
    userId: {
        type: String,
        required: true
    },
    projectName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createAt: {
        type: Number,
        default: Date.now()
    }
})



const Projects = model('Projects', projectSchema)

export default Projects;