import { Avatar, Box, Button, IconButton, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { IoMdSend } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import ChatItem from '../components/chat/ChatItem'
import { useAuth } from '../context/AuthContext'
import { deleteUserChats, getUserChats, sendChatRequest } from '../helpers/api-communicator'

type Message = {
  role: "user" | "assistant";
  content: string;
}


const Chat = () => {
  const navigate = useNavigate()
  const auth = useAuth()
  const inputRef = useRef<HTMLInputElement>(null)
  const [chatMessages, setChatMessages] = useState<Message[]>([])

  console.log(chatMessages);

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = '';
    }

    // grabs all the users input
    const newMessage: Message = {role: "user", content};
    setChatMessages((prev) => [...prev, newMessage])

    // sends the user input to the backend
    const chatData = await sendChatRequest(content)
    try {
      if (chatData) {
        setChatMessages([...chatData.chats])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted Chats Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Deleting Chats Failed", {id: "deletechats"})
    }
  }

  useEffect(() => {
    if (auth?.isLoggedIn && auth?.user) {
      toast.loading("Loading Chats", {id: "loadchats"});
      getUserChats().then((data) => {
          setChatMessages([...data.chats])
          toast.success("Sucessfully loaded chats", {id: "loadchats"})
        }).catch((err) => {
          console.log(err);
          toast.error("Loading failed", {id: "loadchats"})
        });
    }

  }, [auth]);

  useEffect(() => {
    if(!auth?.user){
      return navigate("/login")
    }
  }, [auth, navigate])

  return (
    <Box sx={{
      display: "flex",
      flex: 1,
      width: "100%",
      height: "100%",
      mt: 3,
      gap: 3,
    }}>
      <Box sx={{display: {md: "flex", xs: "none", sm: "none"}, flex: 0.2, flexDirection: "column",}}>
        <Box 
          sx={{
            display: "flex", 
            width: "100%", 
            height: "60vh", 
            bgcolor:"rgb(17, 29, 39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
        }}>
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontweight: 700,
            }}
          >{ auth?.user?.name[0]}</Avatar>
          <Typography sx={{mx: "auto", fontfamily: "work sans"}} >You are talking to a chatBOT</Typography>
          <Typography sx={{mx: "auto", fontFamily: "work sans", my: 4, p: 3}}>
            You can ask some questions related to Knowledge, Business, Advices, Education, etc.
             But avoid sharing personal information
          </Typography>
          <Button
            onClick={handleDelete}
            sx={{
              width: "200px",
              my: 'auto',
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: "#E9967A",
              "&:hover": {
                bgcolor: "#B22222",
              }
            }}
          >clear conversation</Button>
        </Box>
      </Box>
      <Box  
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3
        }}
      >
        <Typography sx={{textAlign: "center", fontSize: "40px", color: "white", mb: 2, fontWeight: "600"}}>
          Model - GPT 3.5 Turbo
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "65vh",
            borderRadius: 3,
            mx: "auto",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
            color: "white"
          }}
        >
         {chatMessages.map((chat, index) => (
          <ChatItem content={chat.content} role={chat.role} key={index} />
         ))}
        </Box>
        <div 
          style={{
            width: "98%", 
            padding: "20px", 
            borderRadius: 8, 
            backgroundColor: "rgb(17, 27, 39)",
            display: "flex",
            marginRight: "auto",
          }}
          >
             <input type="text"
              ref={inputRef}
              style={{
                width: "100%", 
                backgroundColor: "transparent", 
                padding: "10px", 
                border: "none", 
                color: "white", 
                fontSize: "20px",
                outline: "none"
            }}
          />
          <IconButton sx={{ml: "auto", color: "white"}} onClick={handleSubmit}>
            <IoMdSend/>
          </IconButton>
        </div>  
      </Box>
    </Box>
  )
}

export default Chat
