'use client'
import { useRouter } from 'next/navigation';
import React, { memo, useEffect, useState } from 'react'
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { CiMenuBurger } from "react-icons/ci";
import Link from 'next/link'
import AvatarCard from '@/components/AvtarCard';
import { useSearchParams } from 'next/navigation'; 
import { sampleCharts } from '@/assets/sample';
import { MdEdit } from "react-icons/md";
import { MdDone } from "react-icons/md";
import ConfirmationModal from '@/components/ConfirmationModal';
import AddMemberDialoge from '@/components/AddMemberDialoge';
import { sampleUsers } from '@/assets/sample';
import UserItem from '@/components/UserItem';

const Groups = () => {
  const router = useRouter();
  //find chatId form query

  const searchParams = useSearchParams();
  const isAddMember = false;
 
  const chatId = searchParams.get('group')
console.log('chatId',chatId);

const [isEdit, setIsEdit] = useState(false);
  
  const [isMobleMenuOpen, setIsMobleMenuOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [updatedGroupName, setUpdatedGroupName] = useState('');
  const [confirmDeleteDailog, setConfirmDeleteDailog] = useState(false);

  const navigateBack=()=>{
  router.push('/');
  }

  const handleMoblie=()=>{
    console.log('handleMoblie');
    setIsMobleMenuOpen(!isMobleMenuOpen);
  }
  const updateGroupName=()=>{
    console.log('updateGroupName');
    setIsEdit(false);
  }
useEffect(()=>{
  if(chatId){
    setGroupName('My Group');
    setUpdatedGroupName('My Group');
  }
  
  return ()=>{
    setGroupName('');
    setUpdatedGroupName('');
    setIsEdit(false);
  }
},[chatId])

const openAddMemberHandler=()=>{
  console.log('openAddMemberHandler');
}
const openConfirmDeleteHandler=()=>{
  setConfirmDeleteDailog(true);
  console.log('confirmDeleteHandler');
}
const closeConfirmDeleteHandler=()=>{
  setConfirmDeleteDailog(false);
  console.log('closeConfirmDeleteHandler');
}
const deleteHandler=()=>{
  console.log('deleteHandler');
  setConfirmDeleteDailog(false);
}
const removeMemberHandler=(id)=>{
  console.log('removeMemberHandler',id);
}


  const GroupName=<div className=' text-xl'>
  {
    isEdit?<div className=' flex  justify-center gap-2'>

      <input type="text" value={updateGroupName} onChange={
        (e)=>setUpdatedGroupName(e.target.value)
      
      }/>
      <button onClick={updateGroupName}>
      <MdDone  className=' text-green-500  '/>
      </button>
    </div>:
    <div className='flex justify-center gap-2'>
      <p>{groupName}</p>
    <button onClick={()=>setIsEdit(true)}>  
    <MdEdit className=' text-sky-400'/>
    </button>
     </div>

  }
</div>

const ButtonGroup=<div className=' flex justify-center gap-3 flex-col items-center'>
  <button onClick={openAddMemberHandler}className=' bg-sky-300  p-1 text-white'>ADD MEMBER</button>
  <button onClick={openConfirmDeleteHandler}className=' text-red-500'>DELETE GROUP</button>
</div>

  return (
    <div className=' h-[100vh] flex w-[100%] relative '>
      <div className=' hidden sm:block sm:w-[40%] bg-red-200'>
<GroupList myGroups={sampleCharts} chatId={chatId}/>
      </div>
      <div className=' w-[100%] sm:w-[60%] relative'>
      {
        //back button
        <div className=' flex justify-between p-2' >
        <button onClick={ navigateBack}>
          <IoArrowBackCircleSharp  className=' text-[3rem]'/>
        </button>
        
        <button className=' sm:hidden'  onClick={handleMoblie}>
          <CiMenuBurger  className=' text-[3rem]'/>
        </button>
        </div>
      }
  
      {
       groupName && 
       <>
      { GroupName}
     
      

      

    <p className='text-center p-4 text-lg'> Member</p>
   
   
      
      
    <div className='min-h-[60%] w-[80%] mx-auto overflow-y-scroll pr-4' style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(155, 155, 155, 0.5) rgba(0, 0, 0, 0.1)' ,padding:"3px"}}>
    {sampleUsers.map((user) => (
        <UserItem
            user={user}
            key={user._id}
           
            isAdded={true}
            style={{ color: 'white', backgroundColor: 'black' }}
        handler={removeMemberHandler}/>
    ))}
</div>



      {
        ButtonGroup
      }
            {
          confirmDeleteDailog && <ConfirmationModal  text={"Are you sure you want to delete this group?"}cancel={closeConfirmDeleteHandler} 
          action={deleteHandler} />
    

        }
        {

          isAddMember &&
         
          <AddMemberDialoge/>
        
        
        }
        
      </>
}
        </div>
  

    <div>

    </div>
    <div className={`sm:hidden absolute bg-white h-full w-[60%] ${isMobleMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"} transition-opacity duration-700   overflow-y-scroll`}>
    <GroupList myGroups={sampleCharts} chatId={chatId}/>
</div>

    </div>
  )
}
export default Groups;



const  GroupList = ({w='100%',myGroups=[],chatId}) => {  
  return (
    <div className='p-2 '>
     {  myGroups.length>0?
        myGroups.map((group,index)=>{
          return(
            <GroupItem key={group._id} group={group} chatId={chatId} />
          )
        }):<div>No Group Found</div>
     }
    </div>
  )
};

const GroupItem = ({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
      <Link href={`?group=${_id}`} onClick={(e) => {
          if (chatId === _id) {
              e.preventDefault();
          }
      }} >
          <div className=' hover:bg-gray-400 flex gap-2 p-2 border-b-2 text-green-400'>
              <AvatarCard avatar={avatar}/>
              <p>{name}</p>
          </div>
      </Link>
  );
};

 

