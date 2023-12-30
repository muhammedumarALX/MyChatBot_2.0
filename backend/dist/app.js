import express from "express";
import appRouter from "./routes/index.js";
import { config } from "dotenv";
config();
const app = express();
// Use express.json() middleware to parse incoming JSON data
app.use(express.json());
app.use("/api/v1", appRouter);
export default app;
//# sourceMappingURL=app.js.map