import { Users } from "../models";
import { ProjectToUse, UserToUse } from "../types";
import { logger } from "../utils/logger";
import { findProjectByUserId } from "./project.service";
import { findUserById } from "./user.service";




export const getUserWithProjects = async (userId: string): Promise<UserToUse & { projects: ProjectToUse[] } | null> => {
    try {
        const user = await findUserById(userId);
        if (!user) {
            return null;
        }

        const projects = await findProjectByUserId(userId);

        return { ...user, projects };
    } catch (error) {
        logger.error('Error fetching user with projects:', error);
        throw error;
    }
}

export const getAllUsersWithProjects = async (): Promise<any[]> => {
    try {
        const usersWithProjects = await Users.aggregate([
            {
                $lookup: {
                    from: 'projects',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'projects'
                },
            },
            {
                $project:{
                    hashPassword:0,
                    refreshToken:0
                }
            }
        ]);

        return usersWithProjects;
    } catch (error) {
        logger.error('Error fetching users with projects:', error);
        throw error;
    }
};
