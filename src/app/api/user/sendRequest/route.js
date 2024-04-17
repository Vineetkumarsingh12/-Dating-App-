import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";

import { emitEvent } from "@/utils/emitEvent";
import { New_request } from "../../../../constants/events"; 
import decodeCookie from "../../../../utils/decodeCookie";
import Request from "../../../../model/request";


export async function PUT(req){
    dbConnect();
    try{
        const {userId:RequestId}=await req.json();
      
        const userId=await decodeCookie(req);
        
        console.log(RequestId,userId);
        
        const request=await Request.findOne({$or:[{sender:userId,receiver:RequestId},{sender:RequestId,receiver:userId}]});
        console.log('pass1');

        if(request){
            return NextResponse.json({success:false,
                message:'Request already sent'
            },{status:400});
        }
        console.log("pass2");
        await Request.create({sender:userId,receiver:RequestId});
        console.log("pass3");

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