import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import streamifier from 'streamifier';
import dbConnect from '@/utils/dbConnect';
import Chat from '../../../../model/chat';
import decodeCookie from '../../../../utils/decodeCookie';
import User from '../../../../model/user';
import { emitEvent } from '../../../../utils/emitEvent';
import {New_attachment, New_message_alert} from '../../../../constants/events';
import message from '../../../../model/message';






// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export async function POST(req) {
//get multiple files from the formdata
dbConnect();
try{
// 

      const {chatId}=await req.json();
      const userId=await decodeCookie(req);
      const [chat,user]=await Promise.all([Chat.findById(chatId),User.findById(userId,'name')]);
        if(!chat){
            return NextResponse.json({error:'Chat not found',success:false},{status:404});
        }

        const formData = await req.formData();
        //     const files = formData.getAll('files');
        //     console.log(files);
        //     const uploadedImages = [];
        //     // Loop through each file
        //     for (const file of files) {
        //       // Check file size
        //       const fileSizeLimit = 5 * 1024 * 1024; // 5MB limit
        //       if (file.size > fileSizeLimit) {
        //         return NextResponse.json({ error: 'File size too large. Max file size is 5MB', success: false }, { status: 400 });
        //       }
        //       // Convert file buffer to stream
        //       const buffer = await file.arrayBuffer();
        //       const readableStream = streamifier.createReadStream(Buffer.from(buffer));
        //       // Upload image to Cloudinary
        //       const cloudinaryResult = await new Promise((resolve, reject) => {
        //         const stream = cloudinary.uploader.upload_stream({}, (error, result) => {
        //           if (result) {
        //             resolve(result);
        //           } else {
        //             reject(error);
        //           }
        //         });
        //         readableStream.pipe(stream);
        //       });
        //       uploadedImages.push(cloudinaryResult.public_id);
        //     }
        
            console.log(uploadedImages);

        if(uploadedImages.length===0){
            return NextResponse.json({error:'No files uploaded',success:false},{status:400});
        }
        const attachments=[];
        const messageForRealTime={ content:"",attachments,sender:{
            _id:userId,
            name:user.name
        },chat:chatId};
        const messageForDb={ content:"",attachments,sender:userId,chat:chatId};

     const  message=await message.create(messageForDb);



        emitEvent(req,New_attachment,chat.members, messageForRealTime);

        emitEvent(req,New_message_alert,chat.members, {chatId});


    return NextResponse.json({ message, success: true }, { status: 200 });



}catch(err){
    console.log(err);
    return NextResponse.json({ error: 'Server Error', success: false }, { status: 500 });
}

   

}