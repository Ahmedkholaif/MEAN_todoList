const express = require('express');

const cors = require('cors');

const server = express();

const PORT = process.env.PORT || 8080 ;

server.use(express.static('public'));

server.use(cors());

require('./config/mongo-conf');

require('./routes')(server);

server.get('/',(req,res)=>{
    res.send(' Invalid end point');
})

server.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public/index.html'));
})



// start server with env_variables $ PORT= SECRET= MONGO_URL= node .

server.listen( PORT ,()=>{
    console.log(`Server Started at port ${PORT}`)
});
