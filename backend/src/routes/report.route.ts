import express from "express";
import { create, getReports } from "../controllers/report.contrller.ts";

const reportRoute = express.Router()

reportRoute.post("/create", create)
reportRoute.get("/get", getReports)

export default reportRoute