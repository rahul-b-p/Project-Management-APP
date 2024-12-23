import { getEncryptedPassword } from "../config";
import { SignupRequests } from "../models";
import { signupBody } from "../types";
import { logger } from "../utils/logger";


export const signupRequestExistsByEmail = async (email: string): Promise<boolean> => {
    try {
        const userExists = await SignupRequests.exists({ email })
        return userExists ? true : false;
    } catch (error: any) {
        logger.error(error.message);
        throw new Error(error.message);
    }
}

export const insertSignupRequest = async (userBody: signupBody): Promise<void> => {
    try {
        const { username, email, password } = userBody;
        const hashPassword = await getEncryptedPassword(password);

        const newPUser = new SignupRequests({
            username, email, hashPassword
        });
        await newPUser.save();
        return;
    } catch (error: any) {
        logger.error(error.message);
        throw new Error(error.message);
    }
}