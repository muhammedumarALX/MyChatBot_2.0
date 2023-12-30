import User from "../db/models/User.js"
import { Request, Response, NextFunction} from 'express'

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find();
        return res.status(200).json({message: "Confirm", users})
    } catch (error) {
        console.log(error)
        return res.status(200).json({message: "Error found", cause: error.message})
    }
}