const express = require("express");
const deliveryRouter = express.Router();
const deliveryController = require("../controllers/deliveryController");

deliveryRouter.get("/listFulfilledDeliveries", deliveryController.listFulfilledDeliveries);
deliveryRouter.get("/listPendingDeliveries", deliveryController.listPendingDeliveries);

module.exports = deliveryRouter;