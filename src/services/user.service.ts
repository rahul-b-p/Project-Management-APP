import { Users } from "../models"
import { logger } from "../utils/logger";
import { roles, User } from "../types";





export const findUserByEmail = async (email: string) => {
    try {
        const user = await Users.findOne({ email });
        if (!user) return null;
        const existingUser: User & { hashPassword: string } = {
            _id: user._id.toString(),
            username: user.username,
            email: user.email,
            role: user.role,
            refreshToken: user.refreshToken,
            hashPassword: user.hashPassword
        }
        return existingUser;
    } catch (error: any) {
        logger.error(error.message);
        throw new Error(error.message);
    }
}

export const updateRefreshToken = async (_id: string, refreshToken: string): Promise<void> => {
    try {
        const updatedUser = await Users.findByIdAndUpdate({ _id }, { refreshToken });
        await updatedUser?.save();
        return;
    } catch (error: any) {
        logger.error(error.message);
        throw new Error(error.message);
    }
}

export const userExistsByEmail = async (email: string): Promise<boolean> => {
    try {
        const userExists = await Users.exists({ email });
        return userExists ? true : false;
    } catch (error: any) {
        logger.error(error.message);
        throw new Error(error.message);
    }
}

export const checkRefreshTokenExistsById = async (_id: string, RefreshToken: string): Promise<boolean> => {
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

export const findUserById = async (_id: string): Promise<User | null> => {
    try {
        const user = await Users.findById({ _id })
        if (!user) return null;
        const existingUser: User = {
            _id: user._id.toString(),
            username: user.username,
            email: user.email,
            role: user.role,
            refreshToken: user.refreshToken
        }
        return existingUser;
    } catch (error: any) {
        logger.error(error.message);
        throw new Error(error.message);
    }
}

export const deleteRefreshToken = async (_id: string, refreshToken: string): Promise<void> => {
    try {
        const updatedUser = await Users.findByIdAndUpdate({ _id }, { $unset: { refreshToken: 1 } });
        await updatedUser?.save();
        return;
    } catch (error: any) {
        logger.error(error.message);
        throw new Error(error.message);
    }
}

export const findRoleById = async (_id: string): Promise<roles | null> => {
    try {
        const user = await Users.findById({ _id });
        if (!user) return null;
        return user.role;
    } catch (error: any) {
        logger.error(error.message);
        throw new Error(error.message);
    }
}