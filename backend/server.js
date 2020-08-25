const express = require('express');
const cors = require ('cors');
const mongoose = require('mongoose');
const request = require('request');
require ('dotenv').config();
const app=express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

let Location = require('./models/location.model');

const port = process.env.PORT || 5000;
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
}
app.use(cors(corsOptions));
app.use(express.json());
io.on('connect', socket => {
console.log('socket connected');
});

app.get('/getlocation',(req, res) => {
    res.send('Hello World!')
    request('http://ip-api.com/json/' , function(error, resp, body) {
        //console.log(ipuser.lat + ", " + ipuser.lon)
        var ipuser = JSON.parse(body)
        const mobileNo=9940716056;
        const latitude=ipuser.lat;
        const longitude=ipuser.lon;
        console.log(mobileNo,latitude,longitude)
        const createLocation = new Location({mobileNo,latitude,longitude});
            createLocation.save().then((data)=>{
                alert("login success");
                res.send(`User Location added!!!`);
            }).catch(err=> res.send(err))
            io.sockets.emit('MyMessage',{'latitude':latitude,'longitude':longitude});    
    })
  
   /* const latitude=11.0168;
    const longitude=76.9558;
    io.sockets.emit('MyMessage',{'latitude':latitude,'longitude':longitude});
    */
})


const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true});

const connection=mongoose.connection;
connection.once('open',()=>{
    console.log('MongoDb database successfully connected!!')
})

const userRouter = require('./routers/user-route');

app.use('/users',userRouter);

server.listen(port,()=>{
    console.log(`server is running on port:${port}`)
})