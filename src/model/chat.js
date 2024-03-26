import { Schema,model,models } from "mongoose";

const chatSchema=new  Schema({
    name:{
        type:String,
        required:true
    },
    groupChat:{
        type:String,
       default:false
    },
   creator:{
    type:Types.ObjectId,
    ref:'User'
    },
   
 members:[{
    type:Types.ObjectId,
    ref:'User'
    }],
    },{timestamps:true});
export default    models.chatSchema||model('Chat',chatSchema);