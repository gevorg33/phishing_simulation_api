import * as dotenv from 'dotenv';
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET;
export const DB_URI = process.env.MONGODB_URI;
export const API_URL = process.env.API_URL;
