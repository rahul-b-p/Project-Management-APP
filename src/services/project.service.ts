import { Projects } from "../models";
import { projectBody } from "../types";
import { ProjectToUse } from "../types/project.type";
import { logger } from "../utils/logger";




export const insertProject = async (userId: string, project: projectBody): Promise<void> => {
    try {
        const { projectName, description } = project;
        const newProject = new Projects({
            userId, projectName, description
        });
        await newProject.save();
        return;
    } catch (error: any) {
        logger.error(error.message);
        throw new Error(error.message);
    }
}

export const findProjectById = async (_id: string): Promise<ProjectToUse | null> => {
    try {
        const project = await Projects.findById({ _id });
        if(!project) return null;
        const result: ProjectToUse={
            _id:project._id,
            userId:project.userId,
            projectName:project.projectName,
            description:project.description,
            createAt:project.createAt
        }
        return result;
    } catch (error) {
        return null;
    }
}