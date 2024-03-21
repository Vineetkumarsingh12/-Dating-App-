'use client';
import React, { use, useState } from 'react';
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import {adminTab} from "../../../assets/routes";  
import Link from 'next/link';
import { IoIosLogOut } from "react-icons/io";
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

const Sidebar = ({w="100vh"}) => {
  const currentUrl=usePathname();


 const logoutHandler=()=>{
console.log("logout");
  }
  return(
    <div className=' w-[250px] bg-white flex 
    flex-col pt-[20%] items-center h-full  text-lg gap-5'>
    <p className='text-sky-600'> ADMIN</p>

    <div>
      {
  adminTab.map((tab,index)=>{
    return(
     <Link href={tab.path} key={index}>
      <div className={` flex gap-3 items-center ${currentUrl===tab.path?" text-white bg-black":"hover:bg-gray-500 hover:text-white"} p-4 `}>
       {tab.icon}
      <p>{tab.name}</p>
      </div>
      </Link>
    )
  })
}
{
 
    <button onClick={logoutHandler} className=' flex gap items-center gap-2  hover:bg-gray-500 p-4 hover:text-white'> 
    
        <IoIosLogOut/>
      <p>Logout</p>
      
      </button>

}
    </div>
    </div>
  )
}

const isAdmin=true;
const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const router=useRouter();
  const handleMobile = () => {
    console.log("Mobile");
    setIsMobile(!isMobile)
  }
  const handleClose=()=>{
    setIsMobile(false);
  }
  if(!isAdmin){
    return
    {
      router.push("/admin");
    }
  }
  return (
   
    <div className="  flex  relative ">
       <button onClick={handleMobile} className=' absolute right-2 top-2 text-3xl sm:hidden '>
        {
          isMobile ? <IoMdClose/> : <CiMenuBurger />
        
        }
    
       </button>
     <div  className=' hidden  sm:block  '>
<Sidebar/>
     </div>
      <div>
        {children}
        </div>
        {/* drawer */}
        {
          <div className=' absolute  transition-all   duration-1000'>
            {
              isMobile && <Sidebar/>
            } 
          </div>
        }
    </div>
  );
};

export default AdminLayout;
