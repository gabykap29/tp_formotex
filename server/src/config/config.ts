import { config } from 'dotenv';

config();
export const PORT  = process.env.PORT || 4000;
export const MONGO_URI:string = process.env.MONGO_URI || "";
export const JWT_SECRET:any = process.env.JWT_SECRET;