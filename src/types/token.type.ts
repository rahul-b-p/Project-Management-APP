import { JwtPayload } from "jsonwebtoken";
import { roles } from "./roles.type";


export interface TokenPayload extends JwtPayload {
    id: string;
    role: roles;
    iat: number;
    exp: number;
}