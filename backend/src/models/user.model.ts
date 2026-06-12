import mongoose from "mongoose";
import type { TypeUser } from "../types/TypeUser.ts";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true,
    },
    password:{
        type:String,
        required: true
    },
    reportsMade:{
        type:Number,
        default:0
    }
}, {timestamps: true});

const User = mongoose.model<TypeUser>("User", userSchema)

export default User;