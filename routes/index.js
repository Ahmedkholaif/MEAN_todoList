const userRouter = require ('./userRouter');
const todoRouter = require ('./todoRouter');

const bodyParser = require('body-parser');


module.exports = (server)=>{
    server.use(bodyParser.json());
    
    server.use('/users', userRouter);
    server.use('/todos', todoRouter);
    
}