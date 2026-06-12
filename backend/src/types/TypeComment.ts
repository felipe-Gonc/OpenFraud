import {Types} from "mongoose";

export interface TypeComment {
    user_id: Types.ObjectId,
    report_id: Types.ObjectId,
    parent_id:Types.ObjectId,
    content: string
}