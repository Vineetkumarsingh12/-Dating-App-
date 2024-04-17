import  {NextResponse} from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Notification from '../../../../model/request';
import decodeCookie from '@/utils/decodeCookie';
import User from '@/model/user';
import {emitEvent} from '@/utils/emitEvent';
import {New_notification} from '@/constants/events';
import Request from '../../../../model/request';
export async function GET(req){
    dbConnect();
    try{
console.log("pass0")
    
    const userId=await decodeCookie(req);
    console.log("pass0.1")
    const requests=await Request.find({receiver:userId}).populate('sender','name avatar');
        console.log("pass1");
    const allRequest=requests.map(({_id,sender})=>({
        _id,
        sender:{
            _id:sender._id,
            name:sender.name,
            avatar:sender.avatar.url    
        }
    })
    );
    console.log("pass2");

    return  NextResponse.json({success:true,
        data:allRequest
    },{status:200});
} catch(e){
    return NextResponse.json({success:false,
        message:'Something went wrong!'
    },{status:500});

}
}

