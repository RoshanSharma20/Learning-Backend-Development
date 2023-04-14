const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { Schema } = mongoose;
const userModel = require('./models/userModel');
const planModel = require('./models/planModel');
const cookieParser = require('cookie-parser');
app.use(express.json());//express.json() is also a middleware that helps to parse json object to js object
const UserRouter = require('./Routers/userRouter');
// const AuthRouter = require('./Routers/authRouter');
const planRouter = require('./Routers/planRouter');
const reviewRouter = require('./Routers/reviewRouter');

app.listen(3000);
app.use(cookieParser());

//specifying the base url and determining which router to user for the particular base url
app.use('/user', UserRouter);
// app.use('/auth', AuthRouter);

app.use('/plans', planRouter);

app.use('reviews', reviewRouter);

