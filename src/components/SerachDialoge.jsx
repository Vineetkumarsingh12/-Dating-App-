import { useLazySerachUserQuery, useSendFriendRequestMutation } from '@/lib/api/api';
import { useEffect, useRef, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { useCloseOutside } from '../hooks/hooks';
import { setIsSerach } from '../lib/reducers/misc';
import UserItem from './UserItem';
import { send } from 'process';
import toast from 'react-hot-toast';
import {useAsyncMutation} from "../hooks/hooks"

const SerachDialoge = () => {
  const [searchValue, setSearchValue] = useState('');
  const [sendFriendRequest,isLoadingSendFried]=useAsyncMutation(useSendFriendRequestMutation);
  

  const [searchUser]=useLazySerachUserQuery();

  const [users, setUser] = useState([]);
  const addFriendHandler =async (_id) => {
 
 await sendFriendRequest("Sending Friend Request...",{userId:_id});

  };

  const dialogeRef = useRef(null); 

  useCloseOutside(dialogeRef, setIsSerach);


  useEffect(() => {
    const timeOutId = setTimeout(() => {
  // console.log("searchValue ..",searchValue);
  searchUser(searchValue).then(({data})=>{
    console.log("data",data);
    setUser(data.users);
  }).catch((error)=>{
    console.log("error",error);
  })
    },1000);
    return () => {
      clearTimeout(timeOutId);
    };

  }, [searchValue]);

  return (
    <div className='pt-3 flex justify-center items-center h-[calc(100vh-4rem)]' >
      <div className="fixed z-[1000] !mt-0 grid place-items-center overflow-auto bg-white backdrop-blur-sm">
        <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-4 flex flex-col items-center text-black " ref={dialogeRef}>
          <p className='text-xl '>Find People</p>
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
                <UserItem user={user} key={user._id} handler={addFriendHandler} handlerIsLoading={isLoadingSendFried}/>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default SerachDialoge;
