import {Router} from "express"
import { deleteChats, generateChatCompletion, sendChatsToUser } from "../controllers/chat-controllers.js";
import { verifyToken } from "../utils/token-manager.js";
import { chatMessageValidator, validate } from "../utils/validators.js";


const chatRoutes = Router();

chatRoutes.post("/new", validate(chatMessageValidator), verifyToken, generateChatCompletion);
chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);
chatRoutes.get("/delete", verifyToken, deleteChats);


export default chatRoutes;