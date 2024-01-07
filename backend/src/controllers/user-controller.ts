import User from "../db/models/User.js"
import { Request, Response, NextFunction} from 'express'
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find();
        return res.status(200).json({message: "Confirm", users})
    } catch (error) {
        console.log(error)
        return res.status(200).json({message: "Error found", cause: error.message})
    }
}

export const userSignup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // sign up user
        const {name, email, password} = req.body;

        // check if user already exists
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(401).send("User already exist")
        }

        // encrypt the code in strings the pasword
        const hashedPassword = await hash(password, 10)

        // create new user in db
        const user = new User({name, email, password: hashedPassword})
        await user.save()

        // clears any existing token
        res.clearCookie(COOKIE_NAME, {
            path: "/",
            domain:"1ocalhost",
            httpOnly: true,
            signed: true,
        })

        // create a new token when a user signs up
        const token = createToken(user._id.toString(), user.email, '7d');
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            signed: true,
            httpOnly: true,
        })

        return res.status(201).json({message: "new User created", name: user.name, email: user.email, password: user.password})
    } catch (error) {
        console.log(error)
        return res.status(200).json({message: "Error found", cause: error.message})
    }
}

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // login up user
        const { email, password} = req.body;

        // check if user already exists
        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).send("User does not exist")
        }
        
        // check user password
        const correctPassword = await compare(password, user.password)
        if (!correctPassword) {
            return res.status(401).send("Incorrect Password")
        }

        // deletes any existing token
        res.clearCookie(COOKIE_NAME, {
            path: "/",
            domain:"localhost",
            httpOnly: true,
            signed: true,
        })

        // create a new token when a user login
        const token = createToken(user._id.toString(), user.email, '7d');
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            signed: true,
            httpOnly: true,
        })
        return res.status(201).json({message: "User Logged In", name: user.name, email: user.email})
    } catch (error) {
        console.log(error)
        return res.status(200).json({message: "Error found", cause: error.message})
    }
}

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered or Token not found")
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match")
        }
        return res
        .status(200)
        .json({message: "ok", name: user.name, email: user.email})
    } catch (error) {
        console.log(error)
        return res.status(200).json({ message: "Error", cause: error.message }); // Send an error response with the error message
    }
}

export const userLogout = async (req: Request, res: Response, next: NextFunction) => {
    //user token check
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered or Token not found")
        }
        if (user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permissions didn't match")
        }

        // clears the auth tokens
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
          });
        return res
        .status(200)
        .json({message: "Logout successful", name: user.name, email: user.email})
    } catch (error) {
        console.log(error)
        return res.status(200).json({ message: "Error", cause: error.message }); // Send an error response with the error message
    }
};