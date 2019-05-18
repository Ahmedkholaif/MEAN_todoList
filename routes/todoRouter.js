const express = require('express');

const router = express.Router();

const todoController = require('../controllers/todoController');

const { authenticate } = require('../middlewares/auth');

// @@ post create todo
router.post ('/', authenticate, todoController.createTodo);

//@@ get list 
router.get ('/', authenticate, todoController.listTodos);

//@@ put 
router.put ('/:id', authenticate, todoController.editTodo);

//@@ put 
router.put ('/:id/check', authenticate, todoController.checkTodo);

//@@ delete 
router.delete ('/:id', authenticate, todoController.deleteTodo);




module.exports = router ;