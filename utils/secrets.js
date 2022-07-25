import dotenv from "dotenv";
dotenv.config();

export const mongoUri = process.env.MONGO_URI;
export const PORT = process.env.PORT || 8000;
export const jwtSecret = process.env.jwtSecret;
