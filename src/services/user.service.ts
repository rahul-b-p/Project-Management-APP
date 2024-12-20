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

export const updateRefreshToken = async (_id: Types.ObjectId, refreshToken: string) => {
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

export const checkRefreshTokenExistsById = async (_id: string, RefreshToken: string) => {
    try {
        const user = await Users.findById({ _id });
        if (!user) return false;
        if (user.refreshToken == RefreshToken) return true;
        else return false;
    } catch (error: any) {
        logger.error(error.message);
        return false;
    }
}

export const findUserById = async(_id:string)=>{
    try {
        const user = await Users.findById({_id})
        return user;
    } catch (error:any) {
        logger.error(error.message);
        throw new Error(error.message);
    }
}

export const deleteRefreshToken = async (_id: Types.ObjectId, refreshToken: string) => {
    try {
        const updatedUser = await Users.findByIdAndUpdate({ _id }, { $unset:{refreshToken:1} });
        await updatedUser?.save();
        return;
    } catch (error: any) {
        logger.error(error.message);
        throw new Error(error.message);
    }
}