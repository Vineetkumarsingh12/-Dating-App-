import { NextResponse } from "next/server";
import dbConnect from "../../../../utils/dbConnect";
import chat from "../../../../model/chat";
import decodeCookie from "../../../../utils/decodeCookie";
import user from "../../../../model/user";
import { emitEvent } from "../../../../utils/emitEvent";

export async function PUT(req) {
  
    dbConnect();
    try{
        const userId=await decodeCookie(req);
        const {chatId,members}=await req.json();

        const chat=await chat.findById(chatId);
        if(!chat){
            return NextResponse.json({
                message:" not found",
                success:false
            })
        }
        if(chat.creator.toString()!==userId){
            return NextResponse.json({
                message:"not authorized",
                success:false
            })
        }
        if(!chat.groupChat){
              return NextResponse.json({
                message:"not a group",
                success:false
                 })
                }
                 const allNewPromise=members.map(({_id})=>user.findById(_id,'name'));
            const existingMembers= Promise.all(allNewPromise);
          const uniqueMembers=(await existingMembers).filter(({_id})=>!chat.members.includes(_id.toString()));
            chat.members.push(...uniqueMembers.map(({_id})=>_id));

            if(chat.members.length>100){
                return NextResponse.json({
                    message:"too many members",
                    success:false
                })
            }
           const allUser= await chat.save();
            const allNewUsers=uniqueMembers.map(({name})=>name).join(',');
            emitEvent(req,chat.members,`${userId} added ${allNewUsers} to the group`);
            emitEvent(req,refetch_chat,allUser.members);

            return NextResponse.json({
                message:"members added",
                success:true
            })
        }catch(e){
            console.log("Error in addMember: ", e);
            return NextResponse.json({
                message:"Error in addMember",
                success:false
            })
        }

    }



