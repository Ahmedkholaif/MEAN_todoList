const mongoose = require('mongoose');

const todoSchema =new mongoose.Schema({
    title :{
        type:"string",required:true ,unique:true 
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,ref:'User' ,required:true
    },
    completed:{
        type:Boolean , default:false
    }
});

const Todo = new mongoose.model('Todo',todoSchema);
module.exports = Todo;