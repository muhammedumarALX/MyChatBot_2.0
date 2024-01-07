import * as React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
  return null; // Return null if no code blocks are found
}

// code to check if code block exists
function isCodeBlock(str: string) {
  const codeBlockChars = ['#', ';', '[', ']', '{', '}', '<', '>', '//'];
  return codeBlockChars.some(char => str.includes(char));
}

const ChatItem = ({ content, role }: {
  content: string;
  role: "user" | "assistant";
}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();

  // code to render syntax highlighter
  const renderContent = (block: string) => {
    return isCodeBlock(block) ? (
      <SyntaxHighlighter style={coldarkDark} language="javascript">
        {block}
      </SyntaxHighlighter>
    ) : (
      <Typography sx={{ fontSize: "20px" }}>{block}</Typography>
    );
  };

  return (
    <Box sx={{ display: "flex", p: 2, bgcolor: role === "assistant" ? "rgb(17, 29, 39)" : "#004d56", my: 2, gap: 2, borderRadius: 3 }}>
      <Avatar sx={{ ml: "0" }}>
        {role === "assistant" ? <img src='openai.png' alt='openai' width={"30px"} /> : `${auth?.user?.name[0]}`}
      </Avatar>
      <Box>
        {!messageBlocks && (
          <Typography sx={{ fontSize: "20px" }} >{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block, index) => (
            <div key={index}>
              {renderContent(block)}
            </div>
          ))}
      </Box>
    </Box>
  );
};

export default ChatItem;
