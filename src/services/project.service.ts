import { Projects } from "../models";
import { projectBody } from "../types";
import { logger } from "../utils/logger";




export const insertProject= async (userId: string, project: projectBody): Promise<void> => {
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