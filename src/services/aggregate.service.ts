import { ProjectToUse, UserToUse } from "../types";
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
        console.error('Error fetching user with projects:', error);
        throw error;
    }
}