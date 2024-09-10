import { config } from 'dotenv';

config();
export const PORT  = process.env.PORT || 4000;
export const MONGO_URI:string = process.env.MONGO_URI || "";