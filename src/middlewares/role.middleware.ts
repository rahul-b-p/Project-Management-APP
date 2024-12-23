import { NextFunction, Response } from "express";
import { customRequestWithPayload } from "../types";





export const verifyAdmin = (req: customRequestWithPayload, res: Response, next: NextFunction) => {
    try {
        const id = req.payload?.id;
        if(!id) throw new Error('')
        
    } catch (error) {

    }
}