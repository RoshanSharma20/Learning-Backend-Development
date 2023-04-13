const userModel = require('../models/userModel');

module.exports.getUser = async function getUser(req, res) {
    let id = req.id;
    let user = await userModel.findById(id);

    if (user) {
        res.json(user);
    }
    else {
        res.json({
            message: "user not found"
        });
    }
}

module.exports.updateUser = async function updateUser(req, res) {

    try {
        let id = req.params.id;
        let user = await userModel.findById(id);
        let dataToBeUpdated = req.body;

        if (user) {
            const keys = [];
            for (let key in dataToBeUpdated) {
                keys.push(key);
            }

            for (let i = 0; i < keys.length; ++i) {
                user[keys[i]] = dataToBeUpdated[keys[i]];
            }

            const updatedData = await user.save();//the values have been updated in the database

            //a response needs to be sent back
            res.json({
                message: "data has been updated successfully",
                data: updatedData
            })
        }
        else {
            res.json({
                message: "user not found"
            })
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}
module.exports.deleteUser = async function deleteUser(req, res) {
    try {
        let id = req.params.id;
        let user = await userModel.findByIdAndDelete(id);
        if (user) {
            res.json({
                message: "content has been deleted",
                data: user
            });
        }
        else {
            res.json({
                message: "no user found"
            })
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}

module.exports.getAllUser = async function getAllUser(req, res) {
    try {
        let users = await userModel.find()
        if (users) {
            res.json({
                message: "users retrieved",
                data: users
            })
        }
        else {
            res.json({
                message: "no users"
            })
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
    // const id = req.params.id;
    // let obj = {};
    // for (let i = 0; i < users.length; ++i) {
    //     if (users[i]['id'] == id) {
    //         obj = users[i];
    //     }
    // }
    // res.json({
    //     message: "req received",
    //     data: obj
    // })
}

// function setCookies(req, res) {
//     // res.setHeader('Set-Cookie', 'isLoggenIn=true');
//     res.cookie('isLoggedIn', true, { maxAge: 1000 * 60 * 60 * 24 });
//     res.send('cookies has been set');
// }


// function getCookies(req, res) {
//     let cookies = req.cookies.isLoggedIn;
//     console.log(cookies);
//     res.send('cookies is received');
// }

// module.exports = { getUser: getUser, getUsersById: getUserById, postUser: postUser, updateUser: updateUser, deleteUser: deleteUser }
