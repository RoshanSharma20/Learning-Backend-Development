const planModel = require('../models/planModel');
// const { Schema } = mongoose;



module.exports.getAllPlans = async function getAllPlans(req, res) {
    try {
        let plans = await planModel.find();
        if (plans) {
            res.json({
                message: "all plans retrieved",
                data: plans
            })
        }
        else {
            res.json({
                message: "plans not found"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports.getPlan = async function getPlan(req, res) {
    try {
        let id = req.params.id;
        let plan = await planModel.findById(id);

        if (plan) {
            res.json({
                message: "plan retrieved",
                data: plan
            })
        }
        else {
            res.json({
                message: "plan not found",
            })
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}

module.exports.createPlan = async function createPlan(req, res) {
    try {
        let planData = req.body;
        let createdPlan = await planModel.create(planData);
        if (createdPlan) {
            res.json({
                message: "plan created",
                data: createdPlan
            })
        }
        else {
            res.json({
                message: "plan not created"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports.deletePlan = async function deletePlan(req, res) {
    try {
        let id = req.params.id;
        let deletedPlan = await planModel.findByIdAndDelete(id);
        if (deletedPlan) {
            res.json({
                message: "plan deleted successfully",
                data: deletedPlan
            })
        }
        else {
            res.json({
                message: "no plan found to delete"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports.updatePlan = async function updatePlan(req, res) {
    try {
        let id = req.params.id;
        let dataToBeUpdated = req.body;
        let keys = [];
        for (let key in dataToBeUpdated) {
            keys.push(key);
        }

        let plan = await planModel.findById(id);
        for (let i = 0; i < keys.length; ++i) {
            plan[keys[i]] = dataToBeUpdated[keys[i]];
        }
        await plan.save();
        res.json({
            message: "plan updated successfully"
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}


//get top3 plans
module.exports.top3plans = async function top3plans(req, res) {
    try {
        const plans = await planModel.find().sort({
            ratingsAverage: -1
        }).limit(3);

        //getting top3 plans
        res.json({
            message: "top 3 plans",
            data: plans
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}