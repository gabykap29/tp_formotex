import jwt  from "jsonwebtoken";
import {JWT_SECRET} from "../config/config";

//generar token
export const generateToken = (payload: any) => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "1d",
    });
}
//verificar token
export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
}
