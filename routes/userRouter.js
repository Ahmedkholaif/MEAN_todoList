const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

const {authenticate} = require('../middlewares/auth');

// @@ post create user
router.post ('/',userController.createUser);

//@@ post login 
router.post ('/login',userController.login);

//@@ delete  token
router.delete ('/signout', authenticate , userController.signout);

module.exports = router ;