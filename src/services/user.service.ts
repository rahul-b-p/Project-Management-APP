import { Types } from "mongoose";
import { Users } from "../models"
import { logger } from "../utils/logger";





export const findUserByEmail = async (email: string) => {
    try {
        const user = await Users.findOne({ email });
        return user;
    } catch (error: any) {
        logger.error(error.message);
        throw new Error(error.message);
    }
}

export const updateRefreshToken = async (_id:Types.ObjectId, refreshToken: string) => {
    try {
        const updatedUser = await Users.findByIdAndUpdate({ _id }, { refreshToken });
        await updatedUser?.save();
        return;
    } catch (error: any) {
        logger.error(error.message);
        throw new Error(error.message);
    }
}

export const userExistsByEmail = async (email: string) => {
    try {
        const userExists = await Users.exists({ email })
        return userExists ? true : false;
    } catch (error: any) {
        logger.error(error.message);
        throw new Error(error.message);
    }
}