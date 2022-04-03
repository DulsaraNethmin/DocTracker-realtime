const express = require('express');
const http = require('http');
//const cors = require('cors');
const port=process.env.PORT || 8000;
const app=express();
const server=http.createServer(app)
const io=require('socket.io')(server,{
    cors:{
        origin:"*",
    }
});

//middleware

app.use(express.json);
//app.use(cors());


//http.get('/',(req,res)=>res.send("hi"))

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
        if(users[targetId]){
            users[targetId].emit('msg',{"message":msg.message,"time":msg.time});
        }
    });
});

// app.route('/test').get((req,res)=>{
//     console.log("test request");
//     return res.json("App is working.")
// });

app.rout('/test').get((req,res)=>{
    console.log("hello");
    return res.json("hi");
})
server.listen(port,"0.0.0.0",()=>{
    console.log("server started on: "+port);
})