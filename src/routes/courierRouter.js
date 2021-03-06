const express = require("express");
const courierRouter = express.Router();
const courierController = require("../controllers/courierController");

const auth = require("../middlewares/auth");

courierRouter.post("/authentication", courierController.authentication);

courierRouter.post("/newCourier", auth , courierController.newCourier);
courierRouter.get("/listAllCouriers", auth , courierController.listAllCouriers);
courierRouter.get("/listCourierByCpf/:cpf", auth , courierController.FindByCPF);
courierRouter.put("/updateCourier", auth , courierController.updateCourier);
courierRouter.delete("/deleteCourier/:id", auth , courierController.deleteCourier);
courierRouter.get("/getPendingDeliveries/", auth , courierController.listPendingDeliveriesForCourier);
courierRouter.get("/getFinishedDeliveries/", auth , courierController.listFinishedDeliveriesForCourier);
courierRouter.get("/getAllDeliveries/", auth , courierController.listAllDeliveriesForCourier);

module.exports = courierRouter;