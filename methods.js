const express = require('express');
const app = express();
const mongoose = require('mongoose');
const emailValidator = require('email-validator');

app.use(express.json());//express.json() is also a middleware that helps to parse json object to js object

app.listen(3000);

//mounting in express ->used to segregate same routes with different http methods,resembling as small mini applications
// let users = [
//     {
//         "id": 1,
//         "name": "superman"
//     },
//     {
//         "id": 2,
//         "name": "batman"
//     },
//     {
//         "id": 3,
//         "name": "robin"
//     }
// ];

//create a router object
const UserRouter = express.Router();
const AuthRouter = express.Router();

//specifying the base url and determining which router to user for the particular base url
app.use('/user', UserRouter);
app.use('/auth', AuthRouter);

UserRouter
    .route('/')
    .get(getUsers)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser);


UserRouter.route('/:id').get(getUserById);

AuthRouter
    .route('/signup')
    .get(middleware1, getSignUp, middleware2)//adding the middleware to understand the flow of execution
    .post(postSignUp)

async function getUsers(req, res) {
    // let allUsers = await userModel.find();

    //to find particular user with specified query
    let allUsers = await userModel.findOne({ name: 'mario' });
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

//adding middleware1 function
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


//connecting mongoose to the database
const db_link = 'mongodb+srv://Admin:D4YP7PjXSNL0iisO@cluster0.st59zgv.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
    .then((db) => {
        console.log('db connected');
    })
    .catch((err) => {
        console.log(err);
    });


//creating the userSchema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function () {
            return emailValidator.validate(this.email);
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 3
    },
    confirmPassword: {
        type: String,
        required: true,
        minLength: 3,
        validate: function () {
            return this.confirmPassword == this.password;
        }
    }
})


//attaching the pre-hook with the userSchema
userSchema.pre('save', function () {
    console.log('before saving in db', this);//this ->refers to the object that has been created by mongoose(i.e consisting of all details with id)
});


//attaching the pre-hook with userSchema to remove the confirm password by making it undefined
userSchema.pre('save', function () {
    this.confirmPassword = undefined;
})

//attaching the post-hook with the userSchema
userSchema.post('save', function (doc) {
    console.log('after saving in the db', doc);//doc -> is the object that is saved in the db
})

//creating model
const userModel = mongoose.model('userModel', userSchema);

// (async function createUser() {
//     let user = {
//         name: 'mario',
//         email: 'abc@gmail.com',
//         password: '1234',
//         confirmPassword: '1234'
//     };

//     //the returned value is the data is inserted in the database
//     let data = await userModel.create(user);
//     console.log(data);
// })();