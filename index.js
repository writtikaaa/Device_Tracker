const express=require('express');
const socketio=require('socket.io');
const http=require('http');
const path = require('path');

const app=express();
const server=http.createServer(app);
const io=socketio(server);

app.set("view engine","ejs");
app.set(express.static(path.join(__dirname,"public")));
app.use(express.static('public'));



app.get('/',(req,res)=>{
    res.render(__dirname+ "/view/page.ejs");
})

io.on('connection',(socket)=>{
    console.log("connected hoea gache");
    socket.on("send-location",function(data){
      io.emit("recived-locaion",{
        id:socket.id,
        ...data,
      })
    })
    socket.on("disconnect",function(){
        io.emit("user-disconnected",socket.id);
    })
})


server.listen(8000,()=>{
    console.log("server chalu hoeache ");
})