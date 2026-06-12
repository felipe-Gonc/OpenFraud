import mongoose from "mongoose"
import type { TypeComment } from "../types/TypeComment.ts"

const commentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    report_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report",
        required: true,
        index: true
    },
    parent_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: null
    },
    content: {
        type: String,
        required: true
    }
})

const Comment = mongoose.model<TypeComment>("Comment", commentSchema)

export default Comment;