import { NextResponse } from "next/server";
import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../model/user";
import decodeCookie from "../../../../utils/decodeCookie";
import Chat from "../../../../model/chat";
import {getOtherMember} from "../../../../utils/getOtherMember";
export async function GET(req) {
    dbConnect();
    const url=new URL(req.url);
    const userId=decodeCookie(req);
    const chatId=url.pathname.split('/').pop();
    const chats=await  Chat.findById({members:userId,
    groupChat:false,}).populate('members','name avatar');

    const friends=chats.map(({members})=>{
const otherUser=getOtherMember(members,userId);
  return {
    _id:otherUser._id,
    name:otherUser.name,
    avatar:otherUser.avatar.url
  }
    });

    if(chatId){
        const chat=await Chat.findById(chatId);
        const avaiableFreinds=friends.filter((friend)=>!chat.members.includes(friend._id));
        return NextResponse.json({
            success:true,
            friends:avaiableFreinds
        },{status:200});
    }else{
        return NextResponse.json({
            success:true,
            friends:friends
        },{status:200});
    }


}