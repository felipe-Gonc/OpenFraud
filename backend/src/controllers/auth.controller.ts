import type { Request, Response } from "express"
import User from "../models/user.model.ts";
import bcrypt from "bcryptjs";

export const signin = async (req: Request, res: Response) => {
    const { name, password, email } = req.body;

    try {
        if (!name || !password || !email) {
            return res.status(400).json({ message: "Todos os campos são obrigatorios" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Senha tem que ter mais de 6 caracteres" })
        }

        const isValidEmail = (e: string) => {
            const res = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return res.test(e);
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "email invalido" })
        }

        const user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({ message: "email ja esta sendo usando" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)

        const newUser = new User({
            name,
            email,
            password: hashed
        })

        if (newUser) {
            await newUser.save()
            //token

            res.status(201).json({ newUser })
        } else {
            return res.status(400).json({ message: "user invalido" })
        }

    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Todos os campos são obrigatorios" })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "Usuario nao encontrado" })
        }

        const correntPassword = await bcrypt.compare(password, user.password)

        if (correntPassword) {
            return res.status(201).json({ user })
        } else {
            return res.status(400).json({ message: "senha ou email invalidos." });
        }

    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}

export const check = async (req: Request, res: Response) => {
    try {
        res.status(200).json((req as any).user);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
} 