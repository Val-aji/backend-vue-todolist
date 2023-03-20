import jwt from "jsonwebtoken";
import { views } from "../config/views.js";
import dotenv from "dotenv"
dotenv.config()

export const cekAuth = async(req, res, next) => {
    try {
        const token = req.headers.authorization

        const result = jwt.verify(token, process.env.SECRET_KEY)
        
        if(!result) return views(res, 401, "token invalid!")    
        
        if(result) return next()

    } catch (error) {
        views(res, 401, "token invalid!", {error, message: error.message})
    }
}

