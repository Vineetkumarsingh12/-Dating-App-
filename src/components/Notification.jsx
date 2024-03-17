import React, { memo } from 'react'
import { sampleNotifications } from '@/assets/sample'
import { IoMdAdd } from "react-icons/io";
import Image from 'next/image';

const Notification = () => {
  const friendRequestHandler=({_id,accept})=>{
    console.log(_id)
  }
  return (
    <div className='pt-3 flex justify-center items-center h-[100vh]'>
    <div className="fixed   z-[1000] !mt-0 grid place-items-center overflow-auto bg-white  backdrop-blur-sm">
<div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-4 flex flex-col   items-center  text-black ">
 <p className=' text-xl '>Notifications</p>
 {
sampleNotifications.length>0 ? sampleNotifications.map((notification) => (
<NotificationItem sender={notification.sender} key={notification._id} handler={friendRequestHandler}/>
)):  <p> 0 Notification</p>
 }

</div>
</div>
</div>
  )
}

export default Notification;


 export const NotificationItem = ({sender,_id,handler})=>{
  return(
    <div className='flex justify-between items-center  p-2 my-2 rounded-md bg-richblack-700 gap-1'>
    <Image src={sender.avatar} alt="" className='w-10 h-10 rounded-full' width={30} height={30}/>
    <p className=' text-ellipsis '>{`${sender.name} sent you a friend request`}</p> 

  <div className='flex gap-1'>
    <button onClick={()=>(handler({_id,accept:true}))} className=' text-green-600'> Accept</button>
    <button onClick={()=>(handler({_id,accept:false}))} className=' text-red-600'> Reject</button>
  </div>
  </div>
  )
}

    






