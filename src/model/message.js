import { Schema,model,models } from "mongoose";

const messageSchema=new  Schema({
    sender:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    chat:{
        type:Types.ObjectId,
        ref:'Chat',
        required:true
    },
    content:String,
    attachments:[{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }],


},{timestamps:true});
export default models.messageSchema||model('Message',messageSchema);