import  {NextResponse} from 'next/server';
import dbConnect from '../../../../utils/dbConnect';
import chat from '../../../../model/chat';
import decodeCookie from '../../../../utils/decodeCookie';

export async function GET(req){
    await dbConnect();
    try{
    const  userId = await decodeCookie(req);
    const  myChats=await chat.find({members:userId}).populate('members','name avatar');

    const transformedChats=myChats.map(({_id,name,members,groupChat})=>{
        return {
            _id,
            name,
            avatars:groupChat?members.slice(0,3).map(({avatar})=>avatar.url):members.find(({_id})=>_id.toString()!==userId).avatar.url,
            members:members.reduce((prev,curr)=>{
                if(curr._id.toString()!==userId){
                    return prev.push(curr._id)
                }
                return prev;
            },[]),
            groupChat:chat.groupChat,
            creator:chat.creator
        }
    }
    
    );
    return NextResponse.json({
        chats:transformedChats,
        success:true
    });

    }catch(e){
        console.log("Error in getMyChats: ", e);
        return NextResponse.json({
            message:"Error in getMyChats",
            success:false
        })
    }
}