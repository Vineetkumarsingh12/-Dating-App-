import { RiDashboard2Line } from "react-icons/ri";
import { MdManageAccounts } from "react-icons/md";
import { MdOutlineGroup } from "react-icons/md";
import { MdMessage } from "react-icons/md";

export const adminTab=[{
    name:"Dashboard",
    path:"/admin/dashboard",
    icon:<RiDashboard2Line />
},
{
    name:"Users",
    path:"/admin/users-mangement",
    icon:<MdManageAccounts />
},{
    name:"Chats",
    path:"/admin/chats-mangement",
    icon:<MdOutlineGroup/>
},{
    name:"Messages",
    path:"/admin/messages-mangement",
    icon:<MdMessage/>
},]