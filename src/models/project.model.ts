import { model, Schema } from "mongoose";
import { IProject } from "../types/project.type";




const projectSchema = new Schema<IProject>({
    projectName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})



const Projects = model('Projects', projectSchema)

export default Projects;