import jwt from 'jsonwebtoken';
import { logger } from '../../utils/logger';
import { roles, TokenPayload } from '../../types';



export const signRefreshToken = async (id: string, role: roles): Promise<string> => {
    try {
        const secretKey = process.env.REFRESH_TOKEN_SECRET;
        if (!secretKey) {
            throw new Error("Can't Find secret key to sign Access token")
        }
        const RefreshToken = jwt.sign({ id, role }, secretKey, { expiresIn: '7d' });
        return RefreshToken;
    } catch (error) {
        logger.error(error);
        throw new Error("Can't Get Access Token");
    }
}

export const verifyRefreshToken = async (token: string): Promise<TokenPayload | null> => {
    try {

        const secretKey = process.env.REFRESH_TOKEN_SECRET;
        if (!secretKey) {
            throw new Error("Can't find the secret key to sign the Access token");
        }

        const result = jwt.verify(token, secretKey) as TokenPayload | null;
        return result || null;
    } catch (error) {
        return null;
    }
}