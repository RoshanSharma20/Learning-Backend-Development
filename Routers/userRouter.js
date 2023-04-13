const express = require('express');
const userModel = require('../models/userModel');
const cookieParser = require('cookie-parser');
const UserRouter = express.Router();

UserRouter
    .route('/')
    .get(getUsers)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser);



//implementing cookies
UserRouter
    .route('/getCookies')
    .get(getCookies);

UserRouter
    .route('/setCookies')
    .get(setCookies);


UserRouter.route('/:id').get(getUserById);

async function getUsers(req, res) {
    let allUsers = await userModel.find();

    //to find particular user with specified query
    // let allUsers = await userModel.findOne({ name: 'mario' });
    res.json({
        message: 'list of all users',
        data: allUsers
    });
}

function postUser(req, res) {

    console.log(req.body);
    // users = req.body;
    //a response need to be sent back
    res.json({
        message: "your request has been submitted",
        users: req.body
    });
}
async function updateUser(req, res) {
    console.log(req.body);
    let dataToBeUpdated = req.body;
    // //using the for in loop to update the user object
    // for (key in dataToBeUpdated) {
    //     users[key] = dataToBeUpdated[key];
    // }


    // update the value in the database
    let userData = await userModel.findOneAndUpdate({ email: 'abc@gmail.com' }, dataToBeUpdated);
    //a response needs to be sent back
    res.json({
        message: "data has been updated successfully",
        data: userData
    })
}
async function deleteUser(req, res) {
    let dataToBeDeleted = req.body;
    let userData = await userModel.findOneAndDelete(dataToBeDeleted);
    res.json({
        message: "content has been deleted",
        data: userData
    });
}

function getUserById(req, res) {
    const id = req.params.id;
    let obj = {};
    for (let i = 0; i < users.length; ++i) {
        if (users[i]['id'] == id) {
            obj = users[i];
        }
    }
    res.json({
        message: "req received",
        data: obj
    })
}

function setCookies(req, res) {
    // res.setHeader('Set-Cookie', 'isLoggenIn=true');
    res.cookie('isLoggedIn', true, { maxAge: 1000 * 60 * 60 * 24 });
    res.send('cookies has been set');
}


function getCookies(req, res) {
    let cookies = req.cookies.isLoggedIn;
    console.log(cookies);
    res.send('cookies is received');
}

module.exports = UserRouter;