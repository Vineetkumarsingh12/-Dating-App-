import { Schema,model,models } from "mongoose";

const requestSchema=new  Schema({
    status:{
        type:String,
        default:'pending',
        enum:['pending','accepted','rejected']
    },
    sender:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    receiver:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    
    }
},{timestamps:true});
export default models.requestSchema||model('Request',requestSchema);