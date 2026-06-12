import mongoose from "mongoose";
import type { TypeReport } from "../types/TypeReport.ts";

const reportSchema = new mongoose.Schema({
    pixKey: String, // valor

    reportsCount: { // numero de reports
        type: Number,
        default: 0
    },

    confirmationsCount: { //confirmações do report
        type: Number,
        default: 0
    },

    denialsCount: { //contestam o report
        type: Number,
        default: 0
    },

    score: {
        type: Number,
        default: 50
    }
})

const Report = mongoose.model<TypeReport>("Report", reportSchema)

export default Report;