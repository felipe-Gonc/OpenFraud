import express from "express";
import { createComment, getComment, response } from "../controllers/comment.controller.ts";

const commentRoute = express.Router();

commentRoute.post("/createComment", createComment)
commentRoute.post("/response", response)
commentRoute.get("/getComment", getComment)
 
export default commentRoute;