const Todo = require('../models/Todo');
const User = require('../models/User');

const listTodos = async (req,res)=>{
    const { user } = req;
    const promises = user.todos.map( todoId => Todo.findById(todoId));
    const todos = await Promise.all(promises);
    
    return res.status(200).json(todos);
}

const createTodo = (req,res)=>{
    const {user} = req;

    const {title} = req.body;

    if(! title) {
        return res.status(400).json({err:'no title'});
    }else {
        const todo = new Todo({
            title,
            userId:user._id,
        });

        todo.save()
        .then(todo=>{
            User.findByIdAndUpdate(user._id,{$push: {todos: todo._id}})
            .then(()=> {
               return res.status(201).json(todo);
            });
        })
        .catch(err => res.json({err}));
    }
}


const editTodo = (req,res)=>{
    const {title} = req.body;
    const {id} = req.params;

    if(! title) {
        return res.status(400).json({err:'no title'});
    }else {
        Todo.findByIdAndUpdate(id,{$set: {title}},{new: true})
        .then(todo=>{
            return res.status(201).json(todo);
        })
        .catch(err => res.json({err}));
    }
}

const checkTodo = (req,res)=>{
    
    const {id} = req.params;

    Todo.findById(id)
    .then(todo=>{
        todo.completed = !todo.completed;
        todo.save()
        .then(todo=>{
            return res.status(200).json(todo);
        }) 
    })
    .catch(err => res.json({err}));
}

const deleteTodo = (req,res)=>{
    
    const {id} = req.params;
    const {user} = req ;
    Todo.findByIdAndRemove(id)
    .then(todo=>{
        User.findByIdAndUpdate(user._id,{$pull: {todos: todo._id}})
        .then(()=>{
            return res.status(200).json({msg:'Deleted'});
        }) 
    })
    .catch(err => res.json({err}));
}
module.exports={
    listTodos,
    createTodo,
    editTodo,
    checkTodo,
    deleteTodo,
}