const express = require("express");
const deliveryRouter = express.Router();
const deliveryController = require("../controllers/deliveryController");

const auth = require("../middlewares/auth");

deliveryRouter.get("/listFulfilledDeliveries", auth, deliveryController.listFulfilledDeliveries);
deliveryRouter.get("/listPendingDeliveries", auth, deliveryController.listPendingDeliveries);
deliveryRouter.put("/editPending/:id", auth, deliveryController.EditPending);
deliveryRouter.delete("/destroy/:id", auth, deliveryController.DeletePending);
deliveryRouter.post("/", auth, deliveryController.createDelivery);
deliveryRouter.get("/", auth, deliveryController.listAll);

module.exports = deliveryRouter;