const express = require('express');
// let flag = false;//variable to check if user logged in or not
function protectRoute(req, res, next) {
    if (req.cookies.isLoggedIn) {
        //if logged in then go to next function
        next();
    }
    else {
        res.json({
            message: "you are not allowed"
        })
    }
}

module.exports = protectRoute;