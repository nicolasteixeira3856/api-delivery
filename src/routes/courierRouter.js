const express = require("express");
const courierRouter = express.Router();
const courierController = require("../controllers/courierController");

courierRouter.post("/newCourier", courierController.newCourier);
courierRouter.get("/listAllCouriers", courierController.listAllCouriers);
courierRouter.get("/listAssociateByCpf/:cpf", courierController.FindByCPF);
courierRouter.put("/updateCourier", courierController.updateCourier);
courierRouter.delete("/deleteCourier/:id", courierController.deleteCourier);

module.exports = courierRouter;