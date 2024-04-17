"use client";
import React, { use, useEffect, useState } from 'react';
import Header from './Header';
// import main from './main';
import ChatList from "./ChatList"
import {sampleCharts} from "../assets/sample"
import { useParams } from 'next/navigation';
import Profile from "./Profile";
import { useMyChatsQuery} from '../lib/api/api.js';
import { useDispatch, useSelector } from 'react-redux';
import {useError} from "../hooks/hooks";



const AppLayout = () => WrappedComponent => {
  const AppLayoutWrapper = (props) => {
    console.log("AppLayoutWrapper",WrappedComponent);
    const params=useParams();
    const chatId= params?.chatId;
   const {isMobile,}=useSelector(state=>state.misc);
   const dispatch=useDispatch();
  //  const handleMobileClose=()=>dispatch(setIsMobile(false));


  const {data,isLoading,isError,error,refetch}= useMyChatsQuery();
  useError([{isError,error}]);

console.log("data in appLayout",data);




    
  


  // console.log("data122",data); 

    const handleDeleteChat=(e,_id,groupChat)=>{
    e.preventDefault();
    console.log("Delete chat",_id,groupChat);
    }
    return (
      <div onContextMenu={e=>e.preventDefault()}>
       
      <Header />
     
 {/* {
  isLoading ? <div>Loading...</div>:
  //drawer


 } */}



 <div className='flex bg-green-500    h-[calc(100vh-4rem)]'>
 <div  className=' bg-slate-600  hidden moblie:block flex-grow-[1] overflow-y-auto'>
 {
    isLoading ? <div>Loading...</div>:
    <ChatList chats={data?.chats} chatId={chatId} handleDeleteChat={handleDeleteChat}
    />
  }

 
 </div>

 {/* chating */}

  <div className=' bg-red-500 flex-grow-[2] 
   '>
  <WrappedComponent {...props} />
  </div>
  

  <div className=' bg-amber-400   hidden  lg:block flex-grow-[1] '>
    <div className=' flex justify-center items-center h-full'>
   <Profile/>
   </div>
    </div>

 </div>



    
        
        {/* <div>Footer</div> */}
      </div>
    );
  };

  return AppLayoutWrapper;
};

export default AppLayout;
