import React from 'react';

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessageAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {
  return (
    <div>
      {chats.map((chat,index) => { 
        return (
          <div key={index}>
            {chat} 
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
