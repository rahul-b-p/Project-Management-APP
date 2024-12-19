import { getEncryptedPassword } from "../config";
import { Users } from "../models"
import { roles } from "../types/roles.type";
import { logger } from "./logger"



export const createDefaultAdmin = async () => {
    try {
        const adminExists = await Users.exists({ role: 'admin' })
        if (adminExists) {
            logger.info('Admin Exists');
            return;
        }

        const username = process.env.ADMIN_USERNAME;
        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD

        if (!username || !password || !email) {
            throw new Error('Admin credentials are missing!')
        }

        const hashPassword = await getEncryptedPassword(password);

        const defaultAdmin = new Users({
            username, email, hashPassword, role: roles.admin
        });

        await defaultAdmin.save();
        logger.info('Default Admin Created');
    } catch (error: any) {
        logger.error(`Failed to create a Default Admin:${error.message}`);
    }
}