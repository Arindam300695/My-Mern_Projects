const express = require("express");
const { addFoodItemController, getFoodItemController, editFoodItemController, deleteFoodItemController } = require("../controllers/foodController");
const foodRouter = express.Router();

foodRouter.post("/addItem", addFoodItemController);
foodRouter.get("/getFoodItems", getFoodItemController);
foodRouter.patch("/editFoodItem", editFoodItemController);
foodRouter.delete("/deleteFoodItem/:id", deleteFoodItemController);

module.exports = foodRouter;