import moment from "moment";
// import {userSocketIDs} from "../../server.js";


const fileFormate=(url='')=>{
const fileExtension = url.split('.').pop();

if(fileExtension==='mp4' || fileExtension==='webm' || fileExtension==='ogg'){
    return('video');
}
if(fileExtension==='mp3' || fileExtension==='wav'){
    return('audio');
}
if(fileExtension==='png' || fileExtension==='jpg' || fileExtension==='jpeg' || fileExtension==='gif'){
    return('image');
}
return 'file';
}

const transformImage=(url="",width)=>{
   return  url;
}







const  getLastSevenDays=()=>{
    const currentDate=moment();
    const last7Days = [];
    
    for(let i=0;i<7;i++){
       const dayDate=currentDate.clone().subtract(i,'days');
       const dayName=dayDate.format('dddd');
        last7Days.unshift(dayName);
    }

    
    return last7Days.reverse();
    
    }


//  const getSockets=(users)=>{
//  const sockets=users.map(user=>userSocketIDs.get(user._id.toString()));
//     return sockets;
//  }   
    
// export {getLastSevenDays,fileFormate,transformImage,getSockets};
export {getLastSevenDays,fileFormate,transformImage};