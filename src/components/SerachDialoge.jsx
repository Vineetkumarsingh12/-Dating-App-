"use client";
import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import UserItem from './UserItem';
import {sampleUsers} from '../assets/sample';

const SerachDialoge = () => {
  const  [searchValue, setSearchValue] = useState('');
  const [isLoadingSendFried, setIsLoadingSendFried] = useState(false);


   const [users,setUser]=useState(sampleUsers);
  const addFriendHandler= (_id) => {
    console.log(_id)
  }
  return (
    <div className='pt-3 flex justify-center items-center h-[100vh]'>
          <div className="fixed   z-[1000] !mt-0 grid place-items-center overflow-auto bg-white  backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-4 flex flex-col   items-center  text-black ">
        <p className=' text-xl '>Find People</p>
<div className='relative'>
  <CiSearch className=' absolute text-3xl top-2'/>
      <input
  type="text"
  value={searchValue}
  onChange={(e) => setSearchValue(e.target.value)}
  className="w-full h-12 px-3 text-lg font-semibold bg-richblack-700 text-richblack-200 rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-richblack-500 focus:ring-offset-2 focus:ring-offset-richblack-800"
  placeholder={"Search"}
/>

</div>

      <div className='w-full'>
        {
users?.map((user) => (
<UserItem user={user} key={user.id}
handler={addFriendHandler} handlerIsLoading={isLoadingSendFried}/>
))
        }
      </div>
      </div>
    </div>
    </div>
  )
}

export default SerachDialoge
