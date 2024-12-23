import { getEncryptedPassword } from "../config";
import { SignupRequests } from "../models";
import { signupBody, SignupRequest } from "../types";
import { logger } from "../utils/logger";


export const signupRequestExistsByEmail = async (email: string): Promise<boolean> => {
    try {
        const requestExists = await SignupRequests.exists({ email })
        return requestExists ? true : false;
    } catch (error: any) {
        logger.error(error.message);
        throw new Error(error.message);
    }
}

export const insertSignupRequest = async (userBody: signupBody): Promise<void> => {
    try {
        const { username, email, password } = userBody;
        const hashPassword = await getEncryptedPassword(password);

        const newRequest = new SignupRequests({
            username, email, hashPassword
        });
        await newRequest.save();
        return;
    } catch (error: any) {
        logger.error(error.message);
        throw new Error(error.message);
    }
}

export const findAllSignupRequests = async ():Promise<SignupRequest[]> => {
    try {
        const allSignupRequests = await SignupRequests.find()
        const result: SignupRequest[] = allSignupRequests.map((request) => ({
            _id: request._id.toString(),
            username: request.username,
            email: request.email,
        }));
        return result;
    } catch (error: any) {
        logger.error(error.message);
        throw new Error(error.message);
    }
}
