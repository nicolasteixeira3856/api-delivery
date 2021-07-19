const express = require("express");
const deliveryRouter = express.Router();
const deliveryController = require("../controllers/deliveryController");

deliveryRouter.get("/listFulfilledDeliveries", deliveryController.listFulfilledDeliveries);
deliveryRouter.get("/listPendingDeliveries", deliveryController.listPendingDeliveries);
deliveryRouter.put("/editPending/:id", deliveryController.EditPending);
deliveryRouter.delete("/destroy/:id", deliveryController.DeletePending);
deliveryRouter.post("/", deliveryController.createDelivery);
deliveryRouter.get("/", deliveryController.listAll);

module.exports = deliveryRouter;