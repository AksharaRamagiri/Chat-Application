// Node Server Which Will Handle Socket Io Connections.
const io= require('socket.io')(8000)
   
const users={}

io.on('connection',socket=>{
    // If new user joined.
    socket.on('new-user-joined',name=>{
        // console.log("New User",name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });
    // if someone sends a message,broadcast it to other people.
    // To receive the message
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });
    // If any user leaves the chat,let others know.-->Disconnect.
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
})