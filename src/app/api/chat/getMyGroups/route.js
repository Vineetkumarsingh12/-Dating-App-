import { NextResponse } from "next/server";
import dbConnect from "../../../../utils/dbConnect";
import chat from "../../../../model/chat";
import decodeCookie from "../../../../utils/decodeCookie";

export async function GET(req){
       dbConnect();
       try{
              const userId=await decodeCookie(req);
        const chats=await chat.find({
            creator:userId
        }).populate('members','name avatar');
     const groups=chats.map(({_id,name,members})=>({
            _id,
            name,
            members,
            groupChat,
            avatars:members.slice(0,Math.min(3,members.length)).map(({avatar})=>avatar.url)
        }));
        return NextResponse.json({
            groups,
            success:true,
        })

       } catch(e){
              console.log("Error in getMyGroups: ", e);
              return NextResponse.json({
                     message:"Error in getMyGroups",
                     success:false
              })
       }
}