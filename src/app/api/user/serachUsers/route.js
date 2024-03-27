import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/model/user";
import Chat from "@/model/chat";
import { emitEvent } from "@/utils/emitEvent";
import { New_chat_alert } from "@/constants/events";
import decodeCookie from "../../../../utils/decodeCookie";

export async function GET(req){


    dbConnect();
    try{
        const url=new URL(req.url);
        const searchParams=new URLSearchParams(url.search);
        const name=searchParams.get('name')||'';
        const userId=await decodeCookie(req);
        // we have to find all the users who are in my chats
        const myCharts=await Chat.find({groupChat:false,members:userId});

        const allFriendAndMe=myCharts.map(({members})=>members).flat();

        
        // we have to find all the users who are not in my chats
        const allUsersExceptMeAndFriends=await User.find({
            _id:{$nin:allFriendAndMe},
            name:{$regex:name,$options:'i'}
        })//case insensitive serach

        const users=allUsersExceptMeAndFriends.map(({_id,name,avatar})=>({_id,name,avatar:avatar.url}));

        return NextResponse.json({users,success:true},{status:200});
}catch(e){
    console.log("Error in searchUsers: ", e);
    return NextResponse.json({
        message:"Error in searchUsers",
        success:false
    });
}
}