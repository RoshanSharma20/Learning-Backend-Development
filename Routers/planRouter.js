const express = require('express');
const planRouter = express.Router();
const { protectRoute, isAuthorised } = require('../controller/authController');


//all plans
planRouter.route('/allplans')
    .get(getAllPlans)



//own plan taken by the user ->required to be logged in first
planRouter.use(protectRoute);
planRouter.route('/plan/:id')
    .get(getPlan);


//admin and restaurant owner can only create,update or delete plans
planRouter.use(isAuthorised());

planRouter.route('/crudPlan')
    .post(createPlan)
    .patch(updatePlan)
    .delete(deletePlan);
