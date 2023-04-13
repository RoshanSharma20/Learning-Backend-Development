const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_KEY = require('../secrets');//creating the secret key,which is present with the backend

// let flag = false;//variable to check if user logged in or not
function protectRoute(req, res, next) {
    if (req.cookies.login) {
        let isVerified = jwt.verify(req.cookies.login, JWT_KEY);
        if (isVerified) {
            next();
        }
        else {
            res.json({
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

module.exports = protectRoute;