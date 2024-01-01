import express from "express";
import appRouter from "./routes/index.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
config();
const app = express();
// Use express.json() middleware to parse incoming JSON data
app.use(express.json());
// use cookieParser middleware to Parse the secret key
app.use(cookieParser(process.env.COOKIE_SECRET));
// use cors to grant access to the frontend
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/api/v1", appRouter);
export default app;
//# sourceMappingURL=app.js.map