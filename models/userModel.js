const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

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
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'restaurantowner', 'deliveryboy'],
        default: 'user'
    },
    profileImage: {
        type: String,//the location of the image is a url which will be accessed later
        default: 'img/users/default.jpeg'//default location of the profileImage
    }
});


//attaching the pre-hook with the userSchema
userSchema.pre('save', function () {
    console.log('before saving in db', this);//this ->refers to the object that has been created by mongoose(i.e consisting of all details with id)
});


//attaching the pre-hook with userSchema to remove the confirm password by making it undefined
userSchema.pre('save', function () {
    this.confirmPassword = undefined;
});

//attaching the pre-hook with userSchema to encrypt the password
// userSchema.pre('save', async function () {
//     const salt = await bcrypt.genSalt(10);
//     const hashedpass = await bcrypt.hash(this.password, salt);
//     // console.log(hashedpass);
//     this.password = hashedpass;
// })

//attaching the post-hook with the userSchema
userSchema.post('save', function (doc) {
    console.log('after saving in the db', doc);//doc -> is the object that is saved in the db
})

//creating model
const userModel = mongoose.model('userModel', userSchema);

// (async function createUser() {


module.exports = userModel;