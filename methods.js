const express = require('express');
const app = express();

app.use(express.json());
app.listen(3000);


//mounting in express ->used to segregate same routes with different http methods,resembling as small mini applications
let users = [
    {
        "id": 1,
        "name": "superman"
    },
    {
        "id": 2,
        "name": "batman"
    },
    {
        "id": 3,
        "name": "robin"
    }
];

//create a router object
const UserRouter = express.Router();

//specifying the base url and determining which router to user for the particular base url
app.use('/user', UserRouter);

UserRouter
    .route('/')
    .get(getUser)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser);


UserRouter.route('/:id').get(getUserById);

function getUser(req, res) {
    res.json(users);
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
function updateUser(req, res) {
    console.log(req.body);
    let dataToBeUpdated = req.body;
    //using the for in loop to update the user object
    for (key in dataToBeUpdated) {
        users[key] = dataToBeUpdated[key];
    }
    //a response needs to be sent back
    res.json({
        message: "data has been updated successfully"
    })
}
function deleteUser(req, res) {
    res.json({
        message: "content has been deleted"
    })
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