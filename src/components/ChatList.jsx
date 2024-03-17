import React from 'react';
import ChatItem from './ChatItem';

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessageAlerts = [
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
        const {avatar,_id,name,groupChat,members}=chat;
        const newMessageAlert= newMessageAlerts.find((item)=>item.chatId===_id);
  const isOnline = members?.some((member) => onlineUsers.includes(member));
        return (
          <ChatItem 
          index={index}
            name={name}
          newAlertMessage={newMessageAlert} isOnline={isOnline}
          avatar={avatar}
          _id={_id}
          key={_id}
          groupChat={groupChat}
          sameSender={chatId === _id}
          handleDeleteChat={handleDeleteChat}

          />
        );
      })}
    </div>
  );
};

export default ChatList;
