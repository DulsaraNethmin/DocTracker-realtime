const express = require('express');
const http = require('http');
//const cors = require('cors');
const port=process.env.PORT || 8000;
const app=express();
const server=http.createServer(app)
const io=require('socket.io')(server)


app.use(express.json);
//app.get('/',(req,res)=>{res.send("Real time Server")});

var users={};
io.on("connection",(socket)=>{
    console.log("connected");
    socket.on("signin",(id)=>{console.log(id);
        users[id]=socket;
        console.log(users);
    });

    socket.on('msg',(msg)=>{
        console.log(msg);
        var targetId=msg.target;
        //console.log("target id is :"+ targetId);
        console.log(msg)
        if(users[targetId]){
            users[targetId].emit('msg',msg);
        }
    });

    socket.on('new_msg',(id)=>{
        console.log(`Mail Target is ${id}`);
        if(users[id]){
            users[id].emit('incoming_mail',"you have a Incoming mail.");
        }
    });
});





server.listen(port,"0.0.0.0",()=>{
    console.log("server started on: "+port);
})

//app.listen(7000,()=>{console.log('normal server run...')})