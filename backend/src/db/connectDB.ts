import mongoose from "mongoose";

export const connectDB = async () => {
    console.log("Tentando se conectar com o banco de dados 🎲")
    try {
        await mongoose.connect(process.env.MONGO_URI as string)
        console.log("Conectado com sucesso ✔️")
    } catch (error) {
        console.log("Erro ao se conectar ao banco de dados ❌")
    }
}