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
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { userDoesNotExist } from '@/lib/reducers/auth';

const SerachDialoge=dynamic(()=>import('./SerachDialoge'),{ssr:false});
const NewGroup=dynamic(()=>import('./NewGroup'),{ssr:false});
const Notification=dynamic(()=>import('./Notification'),{ssr:false});
import {setIsSerach} from '@/lib/reducers/misc';

const Header = () => {

 const navigate=useRouter();
 const dispatch=useDispatch();
 const {isSerach}=useSelector((state:any)=>state.misc);

 console.log("isSearch",isSerach)

  const [isMoblile,setIsMobile]=useState(false);

  const [isNotification,setIsNotification]=useState(false);
  const [isNewGroup,setIsNewGroup]=useState(false);
 

  const handleMobile=()=>{
    setIsMobile(!isMoblile);
  }
  const handleSearch=()=>{
    dispatch(setIsSerach(!isSerach));
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
  const logoutHandler=async()=>{
    try{
   const {data}=  await axios.get('/api/user/logout');
     toast.success(data.message);
     dispatch(userDoesNotExist());
      navigate.push('/login');
    } catch(err:any){
      console.log(err);
      toast.error('Something went wrong');
    }
     
  }

  return (
    <div className={`h-[4rem] bg-[${orange}] p-5 `}>
    
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
        handle={handleNewGroup}
        />
        <Options 
        title='Group'
        Icon={MdGroups}
        handle={navigateToGroup}
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
        isSerach && <SerachDialoge/>
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
    <div className=' relative group  cursor-pointer' onClick={handle}>
   <Icon  className=' text-[2rem]'/>
   <p className=' absolute  w-fit p-1 bg-gray-400 rounded-lg text-white hidden group-hover:block left-[-18px] z-10'>
      {title}
   </p>
  
    </div>
 

   )
}
export default Header;
