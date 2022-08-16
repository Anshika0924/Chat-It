//node server that will handle socket io connections and
// const io=require('socket.io')(8000);
const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });

const users={};


//io.on is instance of socket.io which will listen to many users
io.on('connection',socket=>{

    //socket.on accepts a event(here userjoined) toh jaise hi user join karega yeh karna h
    //here new-user-joined is the event
    socket.on('new-user-joined',name=>{
        // console.log('new-user-joined',name);
        users[socket.id] = name;  //add in the array
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });

    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });

})