"use client";
import React, { useState } from 'react'

import UserItem from './UserItem'

import { sampleUsers } from '@/assets/sample'
import { set } from 'react-hook-form';
const NewGroup = () => {
  const [isAdded, setIsAdded] = useState(false);
  const selectMemberHandler= (_id) => {
    console.log(_id);
    setSelectedMembers((prev)=>{
      if(prev.includes(_id)){
        return prev.filter((id)=>id!==_id)
      }
      return [...prev,_id]
    
    })
  }
  const sumbitHandler= () => {
    console.log(groupName)
  }
   
  const closeHandler= () => {
    console.log('close')
  }
 
  const [groupName, setGroupName] = useState('');
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);

  return (
    <div className='pt-3 flex justify-center items-center h-[100vh]'>
    <div className="fixed   z-[1000] !mt-0 grid place-items-center overflow-auto bg-white  backdrop-blur-sm">
<div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-4 flex flex-col   items-center  text-black ">
 <p className=' text-xl '>New Group</p>

 <input type="text" placeholder='Group Name' className='w-full h-12 px-3 text-lg  rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-richblack-500 focus:ring-offset-2   bg-gray-300 focus:ring-offset-richblack-800' onChange={
  e=>setGroupName(e.target.value)}
 value={groupName}/>
 <p>Members</p>
 
<div className=''>
 {
members?.map((user) => (
<UserItem user={user} key={user.id}
handler={selectMemberHandler}  isAdded={
  selectedMembers.includes(user._id)
} />
))
        }
        </div>
<div className=' flex gap-2'>
  <button >Cancel</button>
  <button className='  bg-sky-500 p-1 rounded' onClick={sumbitHandler}>Create</button>
</div>
</div>
</div>
</div>
  )
}

export default NewGroup
