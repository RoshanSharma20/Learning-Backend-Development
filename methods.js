const express = require('express');
const app = express();

app.use(express.json());
app.listen(3000);




//creating an user object to send as a response object
// let users = {};
// app.get('/user', (req, res) => {
//     res.send(users);
// });



//understanding params and queries in url
//parameters in requests
//we can use maximum upto 5 parameters
app.get('/user/:id', (req, res) => {
    console.log(req.params.id);
    res.send('hello world');
})


//queries in url
app.get('/user', (req, res) => {
    console.log(req.query);
    res.send('hello');
})


//using the post method to send data from front-end to server
app.post('/user', (req, res) => {
    console.log(req.body);
    users = req.body;
    //a response need to be sent back
    res.json({
        message: "your request has been submitted",
        users: req.body
    })

    //using the patch method to update the user object
    app.patch('/user', (req, res) => {
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
    })

    //using the delete method to delete the contents of the users object
    app.delete('/user', (req, res) => {
        users = {};
        res.json({
            message: "content has been deleted"
        })
    })

})