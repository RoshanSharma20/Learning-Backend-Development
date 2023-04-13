const express = require('express');
const userModel = require('../models/userModel');
const AuthRouter = express.Router();

AuthRouter
    .route('/signup')
    .get(middleware1, getSignUp, middleware2)//adding the middleware to understand the flow of execution
    .post(postSignUp)


AuthRouter
    .route('/login')
    .post(loginUser)

function middleware1(req, res, next) {
    console.log('middleware1 executed');
    next();
}


//adding middleware2 function
function middleware2(req, res)//next is not required here as res is already being sent in this function
{
    console.log('middleware2 executed');
    console.log('sending the response as the index file')
    res.sendFile('./public/index.html', { root: __dirname });
}


function getSignUp(req, res, next) {//adding the next function to allow for next function to be executed
    //file stored in public folder
    // res.sendFile('./public/index.html', { root: __dirname });
    console.log('get user function called');
    next();
}

async function postSignUp(req, res) {
    let dataObj = req.body;
    let user = await userModel.create(dataObj);
    // console.log('backend', obj);
    res.json({
        message: "user signed up",
        data: user
    });
}

async function loginUser(req, res) {
    try {
        let data = req.body;
        if (data.email) {
            let user = await userModel.findOne({ email: data.email });
            if (user) {
                //need to implement the bcrypt function here later
                if (user.password == data.password) {
                    res.json({
                        message: "user has logged in",
                        userDetails: data
                    })
                }
                else {
                    res.json({
                        message: "wrong credentials"
                    })
                }
            }
            else {
                res.json({ message: "user not found" });
            }
        }
        else {
            res.json({
                message: "empty field found"
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

}

module.exports = AuthRouter;