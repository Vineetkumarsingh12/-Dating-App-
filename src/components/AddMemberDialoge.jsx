"use client";
import React, { useState } from 'react'
import { sampleUsers } from '@/assets/sample'
import UserItem from './UserItem';
import { set } from 'react-hook-form';
const AddMemberDialoge = ({addMember,isLoadingAddMember,chatId}) => {
    console.log('AddMemberDialoge');
    const [members, setMembers] = useState(sampleUsers);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const closeHandler=()=>{
        setMembers([]);
        setSelectedMembers([]);
        console.log('closeHandler')
    }
  
    const selectMemberHandler= (_id) => {
        console.log(_id);
        setSelectedMembers((prev)=>{
          if(prev.includes(_id)){
            return prev.filter((id)=>id!==_id)
          }
          return [...prev,_id]
        
        })

      }
      const addMemberSubmitHandler=()=>{
        closeHandler();
        console.log('addMemberSubmitHandler');
    }

  return (
<div className='pt-3 flex justify-center items-center h-[100vh] absolute   bg-red-400 top-0 left-[50%]'>
          <div className="fixed   z-[1000] !mt-0 grid place-items-center overflow-auto bg-white  backdrop-blur-sm">
      <div className=" max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-4 flex flex-col   items-center  text-black ">
        <p className=' text-xl '>Add Member</p>
<div>
{
    members.length>0 ?members.map((user) => (
        <UserItem user={user} key={user._id} 
        handler={selectMemberHandler}
        isAdded={selectedMembers.includes(user._id)}
        />
    )):<p>No friend found</p>

}
</div>

   <div className=' flex gap-2'>
    <button className=' text-red-500 p-1'
    onClick={closeHandler}> Cancel</button>
    <button className='  bg-sky-500 p-1 text-white' 
    onClick={addMemberSubmitHandler}
    disabled={isLoadingAddMember}>Submit</button>
   </div>
      </div>
    </div>
    </div>
  )
}

export default AddMemberDialoge
