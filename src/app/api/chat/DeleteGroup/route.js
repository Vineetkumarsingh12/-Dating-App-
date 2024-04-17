import  {NextResponse} from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Chat from '../../../../model/chat';
import { emitEvent } from '../../../../utils/emitEvent';
import { refetch_chats } from '../../../../constants/events';
import decodeCookie  from '../../../../utils/decodeCookie';
import { deleteFileFromCloudinary } from '../../../../utils/DeleteFileFormCloudinary';
import message from '../../../../model/message';

export async function DELETE(){
    dbConnect();
    try{
         const url=new URL(req.url);
         const id=url.pathname.split('/').pop();
            const userId=await decodeCookie(req);
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


            // we have to delete all message as well as attachments from cloudinary

            const messages=await message.find({chat:id,
                attachments:{$exists:true,$ne:[]}
            });

            const public_ids=[];
            messages.forEach(({attachments})=>{
                attachments.forEach(({public_id})=>{
                    public_ids.push(public_id);
                })
            });

            await Promise.all(
                deleteFileFromCloudinary(public_ids),
                chat.deleteOne(),
                message.deleteMany({chat:id})

            );

            emitEvent(req,refetch_chats,chat.members);

            return NextResponse.json({
                message:'Chat deleted successfully',
                success:true,
            });
    } catch(e){
        console.log("Error in deleteGroup: ", e);
        return NextResponse.json({
            message:"Error in deleteGroup",
            success:false
        })
    }
    
}
