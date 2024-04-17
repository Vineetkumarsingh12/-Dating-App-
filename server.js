// 'use server';
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const {New_message}=require('./src/constants/events');
const { v4: uuid } = require("uuid");

const {getSockets}=require('./src/lib/features');
const httpServer = http.createServer();

const Message=require('./src/model/message');
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
//
const userSocketIDs=new Map();

io.use((socket,next)=>{} );
//



io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  // socket.on("join_room", (roomId) => {
  //   socket.join(roomId);
  //   console.log(`user with id-${socket.id} joined room - ${roomId}`);
  const user={
    _id:"vineettest",
    name:"vikash"
  }

userSocketIDs.set(user._id.toString(),socket.id);

  socket.on(New_message, async({chatId,members,message}) => {

const messageForRealTime={
  content:message,
  _id:uuid(),
  sender:{
    _id:user._id,
    name:user.name
  
  },
  chatId:chatId,
  createdAt:new Date().toISOString(),
}

const messageForDb={
  content:message,
  sender:user._id,
  chat:chatId,
}

const membersSocket=getSockets(members);
io.to(membersSocket).emit(New_message,{
  chatId,
  message:messageForRealTime
});


//new message alert
io.to(membersSocket).emit(New_message_alert,{chatId});

try{
  await Message.create(messageForDb);
} catch(err){
  console.log("websocket DB",err);
}



    console.log("New_message", data);
  });




  socket.on('disconnect', () => {
    console.log(`user with id-${socket.id} disconnected`);

    userSocketIDs.delete(user._id.toString());


  });

  socket.on("send_msg", (data) => {
    console.log(data, "DATA");
    //This will send a message to a specific room ID

    socket.to(data.roomId).emit("receive_msg", data);

    // save the message in the database

    // const message = new Message({
    //   roomId: data.roomId,
    //   message: data.message,
    //   sender: data.sender,
    // });

  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});
 
//loging the port on which the server is running




const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});

export {userSocketIDs};