import React from 'react'
import { memo } from 'react'
import { IoMdAdd } from "react-icons/io";
import Image from 'next/image';
import { IoIosRemoveCircle } from "react-icons/io";

const UserItem = ({user,handler,handlerIsLoading,isAdded=false}) => {
    const {name,_id,avatar} = user; 
    
  return (
    <div key={user.id} className='flex justify-between items-center  p-2 my-2 rounded-md bg-richblack-700'>
    <Image src={avatar} alt="" className='w-10 h-10 rounded-full' width={30} height={30}/>
    <p className=' text-ellipsis'>{user.name}</p> 
    <button
    onClick={()=>handler(_id)}
    disabled={handlerIsLoading}>
    {
      isAdded?<IoIosRemoveCircle className='text-xl bg-red-500 rounded-full '/>:<IoMdAdd className='text-xl bg-sky-500 rounded-full '/> 
}
    </button>

  
  </div>
  )
}

export default memo(UserItem);
