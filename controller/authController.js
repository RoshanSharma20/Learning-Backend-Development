const express = require('express');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const JWT_KEY = require('../secrets');

module.exports.signup = async function signup(req, res) {
    try {
        let dataObj = req.body;
        let user = await userModel.create(dataObj);
        if (user) {
            res.json({
                message: "user signed up",
                data: user
            });
        }
        else {
            res.json({
                message: "error while signing up"
            })
        }

    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}

//login user
module.exports.login = async function login(req, res) {
    try {
        let data = req.body;
        if (data.email) {
            let user = await userModel.findOne({ email: data.email });
            if (user) {
                //need to implement the bcrypt function here later
                if (user.password == data.password) {

                    let uid = user['_id'];//the payload contains the unique id

                    let jwtToken = jwt.sign({ payload: uid }, JWT_KEY);//token obtained from payload + algo + JWT_KEY

                    res.cookie('login', jwtToken, { httpOnly: true });//sending the token in the response
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


//authorize function to check if the user is admin or not
//isAuthorized function
module.exports.isAuthorised = async function isAuthorised(req, res, next) {
    // return function (req, res, next) {
    try {
        let token;
        if (req.cookies.login) {
            token = req.cookies.login;
            let payload = jwt.verify(token, JWT_KEY);//upon verification the function returns payload
            if (payload) {
                const user = await userModel.findById(payload.payload);
                // req.role = user.role;
                req.id = user.id;
                if (user.role == 'admin')
                    next();
                else {
                    res.json({
                        message: "not authorized"
                    })
                }
            }
        }
        else {
            res.json({
                message: "please login first"
            })
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }

}
//protectRoute
module.exports.protectRoute = async function protectRoute(req, res, next) {
    try {
        let token;
        if (req.cookies.login) {
            token = req.cookies.login;
            let payload = jwt.verify(token, JWT_KEY);//upon verification the function returns payload
            if (payload) {
                const user = await userModel.findById(payload.payload);
                // req.role = user.role;
                req.id = user.id;
                next();
            }
            else {
                return res.json({
                    message: "user not verified"
                })
            }
        }
        else {
            res.json({
                message: "you need to login"
            })
        }
    }
    catch (err) {
        res.json({
            message: "some error occured"
        })
    }
}