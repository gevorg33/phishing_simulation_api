import * as dotenv from 'dotenv';
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET;
export const DB_URI = process.env.MONGODB_URI;
export const HOST = process.env.HOOST;
export const PORT = process.env.PORT;
