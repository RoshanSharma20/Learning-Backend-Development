const mongoose = require('mongoose');
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


const reviewSchema = new mongoose({
    review: {
        type: String,
        require: [true, 'review is required']
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: [true, 'rating is required']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'userModel',
        required: [true, 'review must belong to a user']
    },
    plan: {
        type: mongoose.Schema.ObjectId,
        ref: 'planModel',
        reuired: [true, 'review must belong to a paln']
    }
});


//find the reference for user and plan
reviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: "user",
        select: "name profileImage"
    }).populate("plan");
    next();
});


const reviewModel = mongoose.model('reviewModel', reviewSchema);
module.exports = reviewModel;