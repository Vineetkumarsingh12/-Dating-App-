import React from 'react';
import AdminLayout from './Adminlayout';
import { MdManageAccounts } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { FaRocketchat } from "react-icons/fa";
import { MdGroups2 } from "react-icons/md";
import moment from 'moment';
import { DoughnutChart, LineChart } from '../../../components/admin/Charts'
const DashboardPage = () => { 
  const time = moment().format('MMMM Do YYYY, h:mm:ss a');
  const Appbar=<div className=' flex mt-[7%]     p-4  justify-center  items-center bg-white text-black gap-2  rounded-lg'>
  <MdManageAccounts className=' text-3xl ' />
   <div className='flex gap-3'>
    <input type="text" placeholder="Search"  className='rounded-full p-2'/>
    <button className=' bg-black text-white p-3 rounded-full'>Search</button>
   </div>
    <p className='hidden md:block'>{time}</p>
    <IoIosNotifications className=' hidden md:block  text-3xl ' />
  </div>

  
  return (
    <AdminLayout>
      <div className='  w-[100vw]  flex flex-col  items-center sm:w-[calc(100vw-300px)] gap-5 overflow-y-auto'> 
        {
          Appbar
        }
         <div className=' flex flex-col gap-4 ' >
            {/* chartArea */}

            <LineChart value={[10,6,65]} />
           < DoughnutChart labels={["Single Chats","Group Chats"]} value={[23,66]}/>
          </div>
        
       
          <div className=' flex justify-around w-full flex-wrap gap-3'>
           < Widgets title={"Users"}  value={34} Icon={<FaUser/>}/>
           < Widgets title={"Chats"}  value={3} Icon={<FaRocketchat/>}/>
           < Widgets title={"Messages"}  value={12} Icon={<FaMessage/>}/>
           </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;

const Widgets = ({title,value,Icon}) => {


  return(

    <div className=' bg-white  text-black p-2 rounded font-bold  flex flex-col items-center w-[150px]'>

      <p className='p-5 border border-black rounded-full'>{value}</p>

      <div className=' flex gap-2 items-center'>
        {Icon}
        <p>{title}</p>
      </div>
      </div>

  )
}
