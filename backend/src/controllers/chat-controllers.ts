import { NextFunction, Request, Response } from "express";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";
import { configureOpenAI } from "../config/openai-config.js";
import User from "../db/models/User.js";


// creating an asynchronous function to connect to Openai
export const generateChatCompletion = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { message } = req.body;
    try {
      const user = await User.findById(res.locals.jwtData.id);
      if (!user)
        return res
          .status(401)
          .json({ message: "User not registered OR Token malfunctioned" });
      // grab chats of user
      const chats = user.chats.map(({ role, content }) => ({
        role,
        content,
      })) as ChatCompletionRequestMessage[];
      chats.push({ content: message, role: "user" });
      user.chats.push({ content: message, role: "user" });
  
      // send all chats with new one to openAI API
      const config = configureOpenAI();
      const openai = new OpenAIApi(config);
      // get latest response
      const chatResponse = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: chats,
      });
      user.chats.push(chatResponse.data.choices[0].message);
      await user.save();
      return res.status(200).json({ chats: user.chats });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong or tokens exhausted" });
    }
  };

export const sendChatsToUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    //check if the user and token exists
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered or Token not found")
        }
        if (user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permissions didn't match")
        }
        return res
        .status(200)
        .json({message: "ok", chats: user.chats})
    } catch (error) {
        console.log(error)
        return res.status(200).json({ message: "Error", cause: error.message });
    }
}

export const deleteChats = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Find the user by ID
        const user = await User.findById(res.locals.jwtData.id);

        if (!user) {
            return res.status(401).send("User not registered or Token not found");
        }

        // Ensure the user ID matches the token ID
        if (user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permissions didn't match");
        }

        // Clear the chats array of the user
        user.chats = [];
        
        // Save the modified user to the database
        await user.save();

        // Fetch the updated user with cleared chats from the database
        const updatedUser = await User.findById(res.locals.jwtData.id);

        return res
            .status(200)
            .json({ message: "Chats deleted successfully", chats: updatedUser?.chats });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error", cause: error.message });
    }
};

