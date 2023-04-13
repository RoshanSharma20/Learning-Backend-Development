const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_KEY = require('../secrets');//creating the secret key,which is present with the backend

// let flag = false;//variable to check if user logged in or not

module.exports = protectRoute;