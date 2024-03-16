import React from 'react'
import Link from 'next/link'
const ChatItem = ({
    avatar=[],
    name,
    // lastMessage,
    // lastOnline,
    _id,
    groupChat=false,
    sameSender,
    isOnline,
    newMessage,
    index=0,
    handleDeleteChatOpen,

}) => {
  return (
<Link href={`/chat/${_id}`} >
    <div className={` flex items-center p-[1rem] bg-[${sameSender?"black":""}] gap-[1rem] relative text-[${sameSender?"black":""}]`}>
      {/* avatar */}
      {
        
      }
    </div>
</Link>
  )
}

export default ChatItem
