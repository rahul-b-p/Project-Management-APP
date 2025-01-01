import { Projects } from "../models";
import { projectBody, updateProjectBody } from "../types";
import { ProjectToUse } from "../types";
import { logger } from "../utils/logger";

const convertToProjectToUse = (inputData: any): ProjectToUse => {
    return {
        _id: inputData._id,
        userId: inputData.userId,
        projectName: inputData.projectName,
        description: inputData.description,
        createAt: inputData.createAt
    }
}

export const projectExistById = async (_id: string): Promise<boolean> => {
    try {
        const projectExists = await Projects.exists({ _id });
        if (projectExists) return true;
        else return false;
    } catch (error) {
        return false;
    }
}

export const validateProjectOwner = async (userId: string, _id: string) => {
    try {
        const ProjectExists = await Projects.exists({ _id, userId });
        return ProjectExists ? true : false;
    } catch (error: any) {
        logger.error(error.message);
        throw new Error(error.message);
    }
}

export const insertProject = async (userId: string, project: projectBody): Promise<ProjectToUse> => {
    try {
        const { projectName, description } = project;
        const newProject = new Projects({
            userId, projectName, description
        });
        await newProject.save();
        return convertToProjectToUse(newProject);
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
            userId: project.userId.toString(),
            projectName: project.projectName,
            description: project.description,
            createAt: project.createAt
        }
        return result;
    } catch (error) {
        return null;
    }
}

export const findProjectByUserId = async (userId: string): Promise<ProjectToUse[] | []> => {
    try {
        const projects = await Projects.find({ userId });
        const result: ProjectToUse[] = projects.map((project) => ({
            _id: project._id,
            userId: project.userId.toString(),
            projectName: project.projectName,
            description: project.description,
            createAt: project.createAt
        }))
        return result;
    } catch (error) {
        return [];
    }
}

export const updateProjectById = async (_id: string, project: updateProjectBody): Promise<ProjectToUse | null> => {
    try {
        const existingProject = await Projects.findById({ _id });
        if (!existingProject) return null;

        const { updateDescription, updateProjectName } = project;

        const updatedProject = await Projects.findByIdAndUpdate({ _id }, {
            projectName: updateProjectName ? updateProjectName : existingProject.projectName,
            description: updateDescription ? updateDescription : existingProject.description
        });
        if (!updatedProject) return null;
        await updatedProject.save();
        return convertToProjectToUse(updatedProject);
    } catch (error) {
        return null;
    }
}

export const deleteProjectById = async (_id: string): Promise<boolean> => {
    try {
        const deleteProject = await Projects.findByIdAndDelete({ _id });
        if (!deleteProject) return false;
        else return true;
    } catch (error) {
        return false;
    }
}

export const deleteProjectByUserId = async (userId: string): Promise<void> => {
    try {
        await Projects.deleteMany({ userId });
        return;
    } catch (error: any) {
        logger.error(error.message);
        throw new Error(error.message);
    }
}
