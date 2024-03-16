"use client";
import React, { useState } from 'react';
import { orange } from '@/assets/color';
import { MdOutlineMenu } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { MdGroups } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { useRouter} from 'next/navigation';
// import SerachDialoge from './SerachDialoge';
import dynamic from 'next/dynamic';

const SerachDialoge=dynamic(()=>import('./SerachDialoge'),{ssr:false});
const NewGroup=dynamic(()=>import('./NewGroup'),{ssr:false});
const Notification=dynamic(()=>import('./Notification'),{ssr:false});

const Header = () => {

 const navigate=useRouter();

  const [isMoblile,setIsMobile]=useState(false);
  const [isSearch,setIsSearch]=useState(false);
  const [isNotification,setIsNotification]=useState(false);
  const [isNewGroup,setIsNewGroup]=useState(false);
 

  const handleMobile=()=>{
    setIsMobile(!isMoblile);
  }
  const handleSearch=()=>{
    setIsSearch(!isSearch);
  }
  const handleNotification=()=>{
    setIsNotification(!isNotification);
  }
  const handleNewGroup=()=>{
    setIsNewGroup(!isNewGroup);
  }

  const navigateToGroup=()=>{
    console.log('group');
    navigate.push('/groups');
  }
  const logoutHandler=()=>{
    console.log('logout');
  }

  return (
    <div className={`h-[4rem] bg-[${orange}] p-3 `}>
    
    <div className='flex justify-between '>
     <Options
      title='menu'  
      Icon={MdOutlineMenu}
      handle={()=>{}}
      />
      <div className=' flex  gap-2'>
        <Options
        title='search'
        Icon={FaSearch}
        handle={handleSearch}
        />
        <Options
        title='Add'
        Icon={IoMdAdd}
        handle={()=>{}}
        />
        <Options 
        title='Group'
        Icon={MdGroups}
        handle={handleNewGroup}
        />
        <Options
        title='Notification'
        Icon={IoIosNotifications}
        handle={handleNotification}
        />
        <Options
        title='Logout'
        Icon={FiLogOut}
        handle={logoutHandler}
        />
        </div>
      </div>

      {
        isSearch && <SerachDialoge/>
      }
      {
        isNotification && <Notification/>
      }
      {
        isNewGroup && <NewGroup/>
      }
    </div>
  );
};

const Options =({title,Icon,handle}:any)=> { 
   return(
    <div className=' relative group' onClick={handle}>
   <Icon  className=' text-[2rem]'/>
   <p className=' absolute  w-fit p-1 bg-gray-400 rounded-lg text-white hidden group-hover:block left-[-15px]'>
      {title}
   </p>
    </div>
   )
}
export default Header;
