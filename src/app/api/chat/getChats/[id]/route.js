import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Chat from '../../../../../model/chat';
import User from '../../../../../model/user';
import { emitEvent } from '../../../../../utils/emitEvent';
import {New_attachment, New_message_alert} from '../../../../../constants/events';
import message from '../../../../../model/message';

export async function GET(req){
    dbConnect();
   
    try{

      const url=new URL(req.url);
      const serachParams= new URLSearchParams(url.search).get('populate');
           
       console.log(serachParams);
        const id=url.pathname.split('/').pop();
    if(serachParams){
      const chat=await Chat.findById(id).populate("members","name avatar").lean();
      // now chat is not mongoose document
      if(!chat){
        return NextResponse.json({error:'Chat not found',success:false},{status:404});
      }
        chat.members=chat.members.map(({_id,name,avatar})=>({_id,name,avatar:avatar.url}));

        return NextResponse.json({chat,success:true},{status:200});
    }else{
      const chat=await Chat.findById(id);
      if(!chat){
        return NextResponse.json({error:'Chat not found',success:false},{status:404});
      }
      return NextResponse.json({chat,success:true},{status:200});
    }
  




    }catch(e){

    }
       
    
    
    }
    
