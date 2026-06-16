import type { Request, Response } from "express"
import Report from "../models/report.model.ts";
import { validations } from "../libs/validations.ts";

export const create = async (req: Request, res: Response) => {
    const { pixKey, scanType } = req.body;

    try {
        if (!pixKey) {
            return res.status(400).json({ message: "Campo obrigatorio" })
        }

        if (!validations(scanType, pixKey)) {
            return res.status(400).json({ message: "Valor informado invalido" })
        }

        const report = await Report.findOne({ pixKey })

        if (report) { // caso tenha um report ja criado com a chave pix
            report.reportsCount += 1;

            await report.save();

            return res.status(200).json({
                message: "Report atualizado",
                report
            });
        }

        const newReport = await Report.create({
            pixKey: pixKey
        })

        return res.status(200).json({ message: "Report criado com sucesso." })
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

export const getReports = async (req: Request, res: Response) => {
    const { pixSearch, scanType } = req.body;

    try {
        if (!pixSearch) {
            return res.status(400).json({ message: "Campo obrigatorio" })
        }

        if (!validations(scanType, pixSearch,)) {
            return res.status(400).json({ message: "Valor informado invalido" })
        }

        const report = await Report.findOne({
            pixKey: pixSearch
        })

        if(!report){
            res.status(400).json({message: "nenhum report foi encontrado"})
        }

        return res.status(200).json(report)

    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
}