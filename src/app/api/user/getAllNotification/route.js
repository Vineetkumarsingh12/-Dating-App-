import  {NextResponse} from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Notification from '@/model/notification';
import decodeCookie from '@/utils/decodeCookie';
import User from '@/model/user';
import {emitEvent} from '@/utils/emitEvent';
import {New_notification} from '@/constants/events';
export async function GET(req){
    dbConnect();
    try{

    
    const userId=await decodeCookie(req);
    const requests=await Request.find({reciever:userId}).populate('sender','name avatar');
    const allRequest=requests.map(({_id,sender})=>({
        _id,
        sender:{
            _id:sender._id,
            name:sender.name,
            avatar:sender.avatar.url    
        }
    })
    );

    return  NextResponse.json({success:true,
        data:allRequest
    },{status:200});
} catch(e){
    return NextResponse.json({success:false,
        message:'can not get notifications '
    },{status:500});

}
}

