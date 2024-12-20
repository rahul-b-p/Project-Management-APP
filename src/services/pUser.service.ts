import { getEncryptedPassword } from "../config";
import { PUsers } from "../models";
import { IPUser, signupBody } from "../types";
import { logger } from "../utils/logger";


export const pUserExistsByEmail = async (email: string) => {
    try {
        const userExists = await PUsers.exists({ email })
        return userExists ? true : false;
    } catch (error: any) {
        logger.error(error.message);
        throw new Error(error.message);
    }
}

export const insertIntoPUser = async (userBody: signupBody) => {
    try {
        const { username, email, password } = userBody;
        const hashPassword = await getEncryptedPassword(password);

        const newPUser = new PUsers({
            username, email, hashPassword
        });
        await newPUser.save();
        return;
    } catch (error: any) {
        logger.error(error.message);
        throw new Error(error.message);
    }
}