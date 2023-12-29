import express from "express"
import appRouter from "./routes/index.js"
import {config} from "dotenv";

config();

const app = express()

app.use("/api/v1", appRouter)

export default app;