import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./db/connectDB.ts";
import authRoute from "./routes/auth.route.ts";
import reportRoute from "./routes/report.route.ts";

const app = express()
dotenv.config()

app.use(express.json())

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use("/api/auth", authRoute)
app.use("/api/report", reportRoute)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta:🚀 http://localhost:${PORT} `);
    connectDB()
})