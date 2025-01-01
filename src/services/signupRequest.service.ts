import { getEncryptedPassword } from "../config";
import { SignupRequests } from "../models";
import { signupBody, SignUpRequestToUse, UserToSave } from "../types";
import { logger } from "../utils/logger";


const convertToSignUpRequestToUse=(signupData:any):SignUpRequestToUse=>{
    return{
         _id:signupData._id,
         username:signupData.username,
         email:signupData.email,
         createAt:signupData.createAt
    }
}

export const signupRequestExistsByEmail = async (email: string): Promise<boolean> => {
    try {
        const requestExists = await SignupRequests.exists({ email })
        return requestExists ? true : false;
    } catch (error: any) {
        logger.error(error.message);
        throw new Error(error.message);
    }
}

export const insertSignupRequest = async (userBody: signupBody): Promise<SignUpRequestToUse> => {
    try {
        const { username, email, password } = userBody;
        const hashPassword = await getEncryptedPassword(password);

        const newRequest = new SignupRequests({
            username, email, hashPassword
        });
        await newRequest.save();
        return convertToSignUpRequestToUse(newRequest);
    } catch (error: any) {
        logger.error(error.message);
        throw new Error(error.message);
    }
}

export const findAllSignupRequests = async (): Promise<SignUpRequestToUse[]> => {
    try {
        const allSignupRequests = (await SignupRequests.find().lean()).map(convertToSignUpRequestToUse);
        return allSignupRequests;
    } catch (error: any) {
        logger.error(error.message);
        throw new Error(error.message);
    }
}

export const findSignupRequestById = async (_id: string): Promise<Omit<UserToSave,'role'> | null> => {
    try {
        const signupRequest = await SignupRequests.findById({ _id });
        if (!signupRequest) return null;

        const result: Omit<UserToSave, 'role'>  = {
            username: signupRequest.username,
            email: signupRequest.email,
            hashPassword:signupRequest.hashPassword
        }
        return result;
    } catch (error: any) {
        return null;
    }
}

export const deleteSignupRequestById = async (_id: string): Promise<boolean> => {
    try {
        await SignupRequests.findByIdAndDelete({_id});
        return true;
    } catch (error:any) {
        return false
    }
}
