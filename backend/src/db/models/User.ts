import { randomUUID } from "crypto";
import mongoose from "mongoose"

// Define the chat schema
const chatSchema = new mongoose.Schema({
    id: {
        type: String,
        default: randomUUID(),
    },
    role: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});

// Define the user schema using the chat schema as a nested field
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    chats: [chatSchema], // Using chatSchema as an array within the user schema
});

// Create and export the User model based on the user schema
export default mongoose.model('User', userSchema);