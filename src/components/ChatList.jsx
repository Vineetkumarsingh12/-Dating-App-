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
        const {avatars,_id,name,groupChat,members}=chat;
        console.log("members",members);
        console.log("single chat",chat)
        const newMessageAlert= newMessageAlerts.find((item)=>item.chatId===_id);
        const isOnline = (members.length > 0) ? members.some((member) => onlineUsers.includes(member)) : false;

        return (
          <ChatItem 
          index={index}
            name={name}
          newAlertMessage={newMessageAlert} isOnline={isOnline}
          avatar={avatars}
          _id={_id}
          key={index}
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
