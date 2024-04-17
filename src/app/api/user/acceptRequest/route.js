import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import { emitEvent } from "@/utils/emitEvent";
import { New_request, refetch_chats } from "../../../../constants/events";
import decodeCookie from "../../../../utils/decodeCookie";
import Request from "../../../../model/request";
import Chat from "../../../../model/chat";

export async function PUT(req){
    dbConnect();
    try{
        const {RequestId,accept}= await req.json();
        console.log("request id",RequestId);
        console.log("accept",accept)

        const userId=await decodeCookie(req);
        const request=await Request.findById(RequestId).populate('sender',"name").populate('receiver',"name");
        console.log("pass1");

        if(!request){
            return NextResponse.json({success:false,
                message:'Request  not exist '
            },{status:400});
        }
        console.log("pass2");
      if(request.receiver._id===userId){
        return NextResponse.json({success:false,
            message:'unauthorized access'
        },{status:400});
      }
        console.log("pass3");
    
      if(!accept){
      await  request.deleteOne();
      return NextResponse.json({success:true,
        message:'Request rejected'
    },{status:200});
      }
        console.log("pass4");

      const members=[request.sender._id,request.receiver._id];

      await Promise.all([Chat.create({members,
    name:`${request.sender.name}-${request.receiver.name}`}),
   request.deleteOne()]);
    console.log("pass5");

   emitEvent(req,refetch_chats,members);
   console.log("pass6");
   return NextResponse.json({success:true,
    message:'Request accepted'
},{status:200});
    
    }catch(e){

        return NextResponse.json({success:false,
            message:'error in Request '
        },{status:500});
    }

}
