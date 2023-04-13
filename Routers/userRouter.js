const express = require('express');
const userModel = require('../models/userModel');
const cookieParser = require('cookie-parser');
const UserRouter = express.Router();
const protectRoute = require('../Routers/authHelper');
const { getUsers, getUsersById, updateUser, postUser, deleteUser } = require('../controller/userController');

// app.use(cookieParser());

UserRouter
    .route('/')
    .get(protectRoute, getUsers)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser);



//implementing cookies
// UserRouter
//     .route('/getCookies')
//     .get(getCookies);

// UserRouter
//     .route('/setCookies')
//     .get(setCookies);


UserRouter.route('/:id').get(getUsersById);

module.exports = UserRouter;