import {Router} from "express"
import { generateChatCompletion } from "../controllers/chat-controllers.js";
import { verifyToken } from "../utils/token-manager.js";
import { chatMessageValidator, validate } from "../utils/validators.js";


const chatRoutes = Router();

chatRoutes.post("/new", validate(chatMessageValidator), verifyToken, generateChatCompletion);

export default chatRoutes;