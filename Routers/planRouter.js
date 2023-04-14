const express = require('express');
const planRouter = express.Router();
const { protectRoute, isAuthorised } = require('../controller/authController');
const { getAllPlans, getPlan, createPlan, updatePlan, deletePlan, top3plans } = require('../controller/planController');

//all plans
planRouter.route('/allplans').get(getAllPlans)

//top3plans
planRouter.route('/top3').get(top3plans);


//own plan taken by the user ->required to be logged in first
planRouter.use(protectRoute);
planRouter.route('/plan/:id').get(getPlan);


//admin and restaurant owner can only create,update or delete plans
// planRouter.use(isAuthorised());
planRouter.route('/crudPlan').post(createPlan);

planRouter.route('/crudPlan/:id').patch(isAuthorised, updatePlan).delete(isAuthorised, deletePlan);

module.exports = planRouter;
