import { NextFunction } from "express";
import { checkTokenBlacklist, verifyAccessToken, verifyRefreshToken } from "../config";
import { AuthenticationError } from "../errors";
import { customRequestWithPayload, TokenPayload } from "../types";
import { logger } from "../utils/logger";



export const accessTokenAuth = async (req: customRequestWithPayload, res: Response, next: NextFunction) => {
    try {
        const AccessToken = req.headers.authorization?.split(' ')[1];
        if (!AccessToken) return next(new AuthenticationError());

        const isJwtBlacklisted = await checkTokenBlacklist(AccessToken);
        if (isJwtBlacklisted) return next(new AuthenticationError());

        const tokenPayload: TokenPayload = await verifyAccessToken(AccessToken);
        const { id } = tokenPayload;
        req.payload = {
            id
        }
        next();

    } catch (error: any) {
        logger.error(error);
        next(new AuthenticationError());
    }
}

export const refreshTokenAuth = async (req: customRequestWithPayload, res: Response, next: NextFunction) => {
    try {
        const RefreshToken = req.headers.authorization?.split(' ')[1];
        if (!RefreshToken) return next(new AuthenticationError());

        const isJwtBlacklisted = await checkTokenBlacklist(RefreshToken);
        if (isJwtBlacklisted) return next(new AuthenticationError());

        const tokenPayload: TokenPayload = await verifyRefreshToken(RefreshToken);
        const { id } = tokenPayload;
        req.payload = {
            id
        }
        next();

    } catch (error: any) {
        logger.error(error);
        next(new AuthenticationError());
    }
}