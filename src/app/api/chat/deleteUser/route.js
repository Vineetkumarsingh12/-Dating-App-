import { NextResponse } from "next/server";
import dbConnect from "../../../../utils/dbConnect";
import chat from "../../../../model/chat";
import decodeCookie from "../../../../utils/decodeCookie";
import user from "../../../../model/user";
import { emitEvent } from "../../../../utils/emitEvent";


export async function DELETE(req) {

    dbConnect();
    try{
        const userId=await decodeCookie(req);
        const {chatId,deleteUserId}=await req.json();

        const [chat,deletedUser]=await Promise.all([chat.findById(chatId),user.findById(deleteUserId)]);
        if(!chat){
            return NextResponse.json({
                message:" not found",
                success:false
            })
        }
        if(chat.creator.toString()!==userId.toString()){
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
        if(chat.members.length<=2){
            return NextResponse.json({
                message:"cannot delete",
                success:false
            })
        }
        const newMembers=chat.members.filter((member)=>member.toString()!==deleteUserId.toString());

       await chat.findByIdAndUpdate
 emitEvent(req,alert,chat.members,`${deletedUser.name} has been removed from the group`);

        return NextResponse.json({
            message:"User removed",
            success:true,
            status:200
        })

    }    catch(e){
        console.log("Error in deleteUser: ", e);
        return NextResponse.json({
            message:"Error in deleteUser",
            success:false,
            status:500
        })
    }
}