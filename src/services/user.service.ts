import { Users } from "../models"
import { logger } from "../utils/logger";





export const findUserByEmail = async (email: string) => {
    try {
        const user = await Users.findOne({ email });
        return user;
    } catch (error: any) {
        logger.error(error.message);
    }
}