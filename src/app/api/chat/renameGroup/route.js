import  {NextResponse} from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Chat from '../../../../model/chat';
import { emitEvent } from '../../../../utils/emitEvent';
import { refetch_chats } from '../../../../constants/events';

export async function PUT(req){
    dbConnect();
    try{
        const url=new URL(req.url);
          const id=url.pathname.split('/').pop();
          const {name}= await req.json();
          const chat=await Chat.findById(id);
            if(!chat){
                return NextResponse.json({error:'Chat not found',success:false},{status:404});
            }
            if(!chat.groupChat){
                return NextResponse.json({error:'Chat is not a group chat',success:false},{status:400});
            }
            if(chat.creator.toString()!==userId.toString){
                return NextResponse.json({error:'You are not the creator of the chat',success:false},{status:401});
            }
            chat.name=name;
            await chat.save();
             emitEvent(req,refetch_chats,chat.members);
             return NextResponse.json({
                 message:'Chat renamed successfully',
                    success:true,
             });

    }   
    catch(e){
        console.log("Error in renameGroup: ", e);
        return NextResponse.json({
            message:"Error in renameGroup",
            success:false
        })
    }
}


