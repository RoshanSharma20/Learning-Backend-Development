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

const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxLength: [20, 'plan name should not exceed more than 20 characters']
    },
    duration: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: [true, 'price not entered']
    },
    ratingsAverage: {
        type: Number
    },
    discount: {
        type: Number,
        validate: [function () {
            return this.discount < 100
        }, 'discount should not exceed price']
    }
});


//panModel
const planModel = mongoose.model('planModel', planSchema);

//creating an immediatley invoke function to store the plan for testing purpose
// (async function createPlan() {
//     let planObj = {
//         name: 'superfood10',
//         duration: 30,
//         price: 1000,
//         ratingsAverage: 5,
//         discount: 30
//     }
//     // let data = await planModel.create(planObj);
//     // console.log(data);
//     const doc = new planModel(planObj);
//     await doc.save();
// })();

module.exports = planModel;