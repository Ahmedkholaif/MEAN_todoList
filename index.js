const express = require('express');

const cors = require('cors');

const server = express();


const PORT = process.env.PORT || 8080 ;

server.use(cors());

require('./config/mongo-conf');

require('./routes')(server);


server.use(express.static('public'));


// start server with env_variables $ PORT= SECRET= MONGO_URL= node .



if (process.env.NODE_ENV === 'production') {
    server.use(express.static('client/build'));
    server.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','index.html'));
    })
}

server.listen( PORT ,()=>{
    console.log(`Server Started at port ${PORT}`)
});
