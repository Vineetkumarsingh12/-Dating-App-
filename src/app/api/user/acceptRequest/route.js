import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import { emitEvent } from "@/utils/emitEvent";
import { New_request, refetch_chats } from "../../../../constants/events";
import decodeCookie from "../../../../utils/decodeCookie";
import Request from "../../../../model/request";

export async function PUT(req){
    dbConnect();
    try{
        const {userId:RequestId,accept}=req.json();
        const userId=await decodeCookie(req);
        const request=await Request.findById(RequestId).populate('sender',"name").populate('reciever',"name");

        if(request){
            return NextResponse.json({success:false,
                message:'Request already sent'
            },{status:400});
        }
      if(request.reciever._id.toString()===userId){
        return NextResponse.json({success:false,
            message:'unauthorized access'
        },{status:400});
      }
    
      if(!accept){
      await  request.deleteOne();
      return NextResponse.json({success:true,
        message:'Request rejected'
    },{status:200});
      }

      const members=[request.sender._id,request.reciever._id];

      await Promise.all([Chat.create({members,
    name:`${request.sender.name}-${request.reciever.name}`}),
   request.deleteOne()]);

   emitEvent(req,refetch_chats,members);
   return NextResponse.json({success:true,
    message:'Request accepted'
},{status:200});
    }catch(e){

        return NextResponse.json({success:false,
            message:'error in Request '
        },{status:500});
    }

}
