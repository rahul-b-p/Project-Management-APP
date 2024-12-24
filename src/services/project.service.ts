import { Projects } from "../models";
import { projectBody, updateProjectBody } from "../types";
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
        if (!project) return null;
        const result: ProjectToUse = {
            _id: project._id,
            userId: project.userId,
            projectName: project.projectName,
            description: project.description,
            createAt: project.createAt
        }
        return result;
    } catch (error) {
        return null;
    }
}

export const updateProjectById = async (_id: string, project: updateProjectBody): Promise<boolean> => {
    try {
        const existingProject = await Projects.findById({ _id });
        if (!existingProject) return false;

        const { updateDescription, updateProjectName } = project;

        const updatedProject = await Projects.findByIdAndUpdate({ _id }, {
            projectName: updateProjectName ? updateProjectName : existingProject.projectName,
            description: updateDescription ? updateDescription : existingProject.description
        });
        if (!updatedProject) return false;
        await updatedProject.save();
        return true
    } catch (error) {
        return false;
    }
}

export const deleteProjectById = async (_id: string) => {
    try {
        const deleteProject = await Projects.findByIdAndDelete({_id});
        if(!deleteProject) return false;
        else return true;
    } catch (error) {
        return false;
    }
}