import type { Request, Response } from "express"
import User from "../models/user.model.ts";
import Report from "../models/report.model.ts";
import Comment from "../models/comment.model.ts";
import { assert } from "node:console";

export const createComment = async (req: Request, res: Response) => {
    const { user_id, report_id } = req.params;
    const { content } = req.body;

    try {
        if (!content) {
            return res.status(400).json({ message: "Campo obrigatorio" })
        }

        const user = await User.findById(user_id);

        if (!user) {
            return res.status(400).json({ message: "user nao encontrado" })
        }

        const report = await Report.findById(report_id)

        if (!report) {
            return res.status(404).json({
                message: "Report não encontrado"
            })
        }

        const comment = await Comment.create({
            user_id: user_id as string,
            report_id: report_id as string,
            content: content as string
        })

        return res.status(200).json(comment)

    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
}

export const response = async (req: Request, res: Response) => {
    const { user_id, report_id, parent_id } = req.params;
    const { content } = req.body;

    try {
        if (!content) {
            return res.status(400).json({ message: "Campo obrigatorio" })
        }

        const user = await User.findById(user_id);

        if (!user) {
            return res.status(400).json({ message: "user nao encontrado" })
        }

        const report = await Report.findById(report_id)

        if (!report) {
            return res.status(404).json({
                message: "Report não encontrado"
            })
        }

        const response = await Comment.create({
            user_id: user_id as string,
            report_id: report_id as string,
            content: content as string,
            parent_id: parent_id as string
        })

        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
}

export const getComment = async (req: Request, res: Response) => {
    const { report_id } = req.body;

    try {

        const report = await Report.findById(report_id);

        if (!report) {
            return res.status(404).json({
                message: "Report não encontrado"
            });
        }
        
        const comment = await Comment.find({ report_id })

        return res.status(200).json(comment)

    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
}