import { Schema, model, models } from "mongoose";

const chatSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    groupChat: {
        type: String,
        default: false
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });

// Check if the Chat model already exists in the models object
const ChatModel = models.Chat || model('Chat', chatSchema);

export default ChatModel;
