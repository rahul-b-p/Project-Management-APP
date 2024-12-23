import { Users } from "../models"
import { logger } from "../utils/logger";
import { roles, signupBody, updateUserByIdBody, UserToSave, UserToUse } from "../types";
import { getEncryptedPassword } from "../config";





export const findUserByEmail = async (email: string): Promise<UserToUse & { hashPassword: string } | null> => {
    try {
        const user = await Users.findOne({ email });
        if (!user) return null;
        const existingUser: UserToUse & { hashPassword: string } = {
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

export const findUserById = async (_id: string): Promise<UserToUse | null> => {
    try {
        const user = await Users.findById({ _id })
        if (!user) return null;
        const existingUser: UserToUse = {
            _id: user._id.toString(),
            username: user.username,
            email: user.email,
            role: user.role
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

export const insertUser = async (user: UserToSave): Promise<void> => {
    try {
        const newUser = new Users({
            username: user.username,
            email: user.email,
            hashPassword: user.hashPassword,
            role: user.role
        });
        await newUser.save();
        return;
    } catch (error: any) {
        logger.error(error.message);
        throw new Error(error.message);
    }
}

export const findAllUsersByRole = async (role: roles): Promise<UserToUse[] | []> => {
    try {
        const allUsers = await Users.find({ role });
        const result: UserToUse[] = allUsers.map((user) => ({
            _id: user._id.toString(),
            username: user.username,
            email: user.email,
            role: user.role
        }));
        return result;
    } catch (error) {
        return [];
    }
}

export const findhashPasswordById = async (_id: string): Promise<string | null> => {
    try {
        const user = await Users.findById({ _id });
        if (!user) return null;
        return user.hashPassword;
    } catch (error) {
        return null;
    }
}

export const userExistsById = async (_id: string): Promise<boolean> => {
    try {
        const userExists = await Users.exists({ _id });
        return userExists ? true : false;
    } catch (error: any) {
        return false;
    }
}

export const updateUserById = async (_id: string, updateBody: updateUserByIdBody): Promise<boolean> => {
    try {
        const { updateEmail, updatePassword, updateUsername } = updateBody
        const existingUser = await Users.findById({ _id })
        if (!existingUser) return false;

        const hashPassword = updatePassword ? await getEncryptedPassword(updatePassword) : existingUser.hashPassword;
        const updatedUser = await Users.findByIdAndUpdate({ _id }, {
            username: updateUsername ? updateUsername : existingUser.username,
            hashPassword,
            email:updateEmail?updateEmail:existingUser.email
        });
        if(!updatedUser) return false;

        await updatedUser.save();
        return true;
    } catch (error:any) {
        logger.error(error.message);
        throw new Error(error.message);
    }
}
