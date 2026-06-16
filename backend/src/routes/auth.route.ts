import express from "express";
import { check, login, signin } from "../controllers/auth.controller.ts";

const authRoute = express.Router();

authRoute.post("/signin", signin)
authRoute.post("/login", login)
authRoute.get("/check", check)

export default authRoute;