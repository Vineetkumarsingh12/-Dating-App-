"use client";
import React from 'react';
import Header from './Header';
// import main from './main';
import ChatList from "./ChatList"

const AppLayout = () => WrappedComponent => {
  const AppLayoutWrapper = (props) => {
    return (
      <>
       
      <Header />
     
 
 <div className='flex bg-green-500    h-[calc(100vh-4rem)]'>
 <div  className=' bg-slate-600  hidden moblie:block flex-grow-[1]'>
  <ChatList chats={[1,2,3,4,5]}/>
 </div>

 {/* chating */}
  <div className=' bg-red-500 flex-grow-[2]'>second column</div>
  <div className=' bg-amber-400 hidden  lg:block flex-grow-[1]'>third column</div>

 </div>



    
        <WrappedComponent {...props} />
        {/* <div>Footer</div> */}
      </>
    );
  };

  return AppLayoutWrapper;
};

export default AppLayout;
