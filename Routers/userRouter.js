const express = require('express');
// const userModel = require('../models/userModel');
// const cookieParser = require('cookie-parser');
const UserRouter = express.Router();
// const protectRoute = require('../Routers/authHelper');
const { getUser, getAllUser, updateUser, deleteUser } = require('../controller/userController');
const { signup, login, isAuthorised, protectRoute } = require('../controller/authController');
// app.use(cookieParser());


//options for user
UserRouter.route('/:id')
    .patch(updateUser)
    .delete(deleteUser);


UserRouter.route('/signup')
    .post(signup);


UserRouter.route('/login')
    .post(login);

//profile page
// UserRouter.use(protectRoute);
UserRouter.route('/userProfile')
    .get(protectRoute, getUser)


//admin specific function        
UserRouter.use(isAuthorised(['admin']));//passing the isAuthorised function with an array  
UserRouter.route('')
    .get(getAllUser)
module.exports = UserRouter;