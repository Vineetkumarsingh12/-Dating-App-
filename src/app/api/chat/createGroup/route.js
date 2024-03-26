import { NextResponse } from "next/server";
import dbConnect from "../../../../utils/dbConnect";
import group from "../../../../model/chat";
import decodeCookie from "../../../../utils/decodeCookie";
import { emitEvent } from "../../../../utils/emitEvent";
import { alert, refetch_chats } from "../../../../constants/events";


export async function POST(req) {
    await dbConnect();
    try {
        const userId = await decodeCookie(req);
        const { name, members } = await req.json();
        console.log(name, members);

       //all members
       const allMembers = [...members, userId];

        const newGroup = new group({
            name,
            members: allMembers,
            creator: userId,
            groupChat: true,
        });

        const savedGroup = await newGroup.save();
emitEvent(req,alert,allMembers,`welcome to  ${name} group`);
  emitEvent(req,refetch_chats,members);

        return NextResponse.json({ message: "Group created successfully",success:true });


    }catch(e){
        console.log("Error in createGroup: ", e);
    }
}