import { logger } from "../utils/logger";
import { deleteProjectByUserId } from "./project.service";
import { deleteUserById } from "./user.service"




export const deleteAccountById = async (id: string): Promise<boolean> => {
    try {
        const isUserDeleted = await deleteUserById(id);
        if (!isUserDeleted) return false;
        await deleteProjectByUserId(id);
        return true;
    } catch (error) {
        logger.error('Error fetching user with projects:', error);
        throw error;
    }
}