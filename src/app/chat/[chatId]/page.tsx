"use client";
import React, { useRef } from 'react'
import AppLayout from "@/components/AppLayout"
import { MdOutlineAttachFile } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import FileMenu from "@/components/FileMenu";
import MessageComponent from "@/components/MessageComponent";
import {sampleMessages} from "@/assets/sample";

const Chat = () => {
  const container = useRef(null);
  const user={
    _id: '123',
    name: 'vineet',
  }
 
  return (
    <div className=' h-[100%]'>
   <div className=' h-[90%] flex flex-col p-4 '>
{
sampleMessages.map((message, index) => (
  <MessageComponent key={index} message={message} user={user} />
))

}
   </div>
   <form className='h-10'>
  <div className=' flex items-center relative px-3'>
  <FileMenu />
    <button className='absolute left-6' >
      <MdOutlineAttachFile size={34} className='bg-white p- rounded-full' />
    </button>
    
    <input type="text" placeholder="Type a message" className=' h-14 pl-20 w-full pr-4  rounded-full'  />
    
    <button type="submit" className='absolute right-6'>
      <IoIosSend size={34} className=' bg-white  p- rounded-full'/>
    </button>
  </div>
</form>

    </div>
  )
}

export default AppLayout()(Chat); 
