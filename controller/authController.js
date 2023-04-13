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
module.exports.isAuthorised = function isAuthorised(roles) {
    return function (req, res, next) {
        if (roles.include(req.role) == true) {
            next();
        }
        else {
            res.status(401).json({
                message: "operation not allowed"
            })
        }
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
                message: "you are not allowed"
            })
        }
    }
    catch (err) {
        res.json({
            message: "some error occured"
        })
    }
}