import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";

import { emitEvent } from "@/utils/emitEvent";
import { New_request } from "../../../../constants/events"; 
import decodeCookie from "../../../../utils/decodeCookie";
import Request from "../../../../model/request";


export async function PUT(req){
    dbConnect();
    try{
        const {userId:RequestId}=req.json();
        const userId=await decodeCookie(req);
        
        const request=await Request.findOne({$or:[{sender:userId,reciever:RequestId},{sender:RequestId,reciever:userId}]});

        if(request){
            return NextResponse.json({success:false,
                message:'Request already sent'
            },{status:400});
        }
        
        await Request.create({sender:userId,reciever:RequestId});

        emitEvent(req,New_request,[RequestId]);
        return NextResponse.json({success:true,
            message:'Request sent'
        },{status:200});
    }catch(e){

        return NextResponse.json({success:false,
            message:'Request not sent'
        },{status:500});
    }
}