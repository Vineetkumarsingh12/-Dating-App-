import { NextResponse } from "next/server"; 
import dbConnect from "../../../../../utils/dbConnect";
import chat from "../../../../../model/chat";
import decodeCookie from "../../../../../utils/decodeCookie";
import { emitEvent } from "../../../../../utils/emitEvent";
import { alert, refetch_chats } from "../../../../../constants/events";


export async function DELETE(req) {
    dbConnect();
    try{
        const userId=await decodeCookie(req);
        // data from params
        const {id}=req.params;

        const chat=await chat.findById(id);
        if(!chat){
            return NextResponse.json({
                message:" not found",
                success:false
            })
        }

    
     if(!chat.groupChat){
         return NextResponse.json({
             message:"not a group",
             success:false
         })
     }
 
     chat.members=chat.members.filter((member)=>member.toString()!==userId.toString);

    if(chat.creator.toString()===userId.toString()){
        const randomNumber=Math.floor(Math.random()*chat.members.length);
        chat.creator=chat.members[randomNumber];
    }
    emitEvent(req,alert,chat.members,`${id} has left the group`);

    await chat.save();
    
     return NextResponse.json({
            message:" removed successfully",
            success:true,
            status:200
        })

    }catch(e){
        console.log("Error in leaveGroup: ", e);
        return NextResponse.json({
            message:"Error in leaveGroup",
            success:false
        })
    }
}