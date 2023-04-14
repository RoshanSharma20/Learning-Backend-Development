const express = require('express');
// const userModel = require('../models/userModel');
// const cookieParser = require('cookie-parser');
const UserRouter = express.Router();
// const protectRoute = require('../Routers/authHelper');
const { getUser, getAllUser, updateUser, deleteUser } = require('../controller/userController');
const { signup, login, isAuthorised, protectRoute, forgetpassword, resetpassword, logout } = require('../controller/authController');
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
UserRouter.use(protectRoute);
UserRouter.route('/userProfile')
    .get(getUser)


//forget password
UserRouter.route('/forgetpassword')
    .post(forgetpassword)


//reset password
UserRouter.route('/forgetpassword/:token')
    .post(resetpassword)



UserRouter.route('/logout')
    .get(logout);

//admin specific function        
// UserRouter.use(isAuthorised());//passing the isAuthorised function with an array  
UserRouter.route('/')
    .get(isAuthorised, getAllUser)
module.exports = UserRouter;