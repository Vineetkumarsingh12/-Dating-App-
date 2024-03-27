import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Chat from "../../../../model/chat";
import User from "../../../../model/user";
import { emitEvent } from "../../../../utils/emitEvent";
import { New_attachment, New_message_alert } from "../../../../constants/events";
import message from "../../../../model/message";

export async function GET(req) {
    dbConnect();
    
    try {
        const url = new URL(req.url);
        const serachParams = new URLSearchParams(url.search);
        const page=serachParams.get('page')||1;
        const limit=20;
        const skip=(page-1)*limit;


        const id = url.pathname.split("/").pop();
        const [ messages,totalMessagesCount]=Promise.all([await message.find({ chat: id }).sort({ createdAt: -1 }).skip(skip).limit(limit).populate("sender", "name avatar").lean(),message.countDocuments({chat:id})]);
     const totalPages=Math.ceil(totalMessagesCount/limit);

     return NextResponse.json({messages:
        messages.reverse(),totalPages,success:true},{status:200});
    }
    catch (e) {
        console.log("Error in getMessages: ", e);
        return NextResponse.json({
            message: "Error in getMessages",
            success: false
        });
    }
}