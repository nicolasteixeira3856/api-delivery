const express = require("express");
const clientsRouter = express.Router();
const clientController = require("../controllers/clientsController");

clientsRouter.put("/:id", clientController.EditClient);
clientsRouter.get("/find/:cnpj", clientController.FindByCnpj)
clientsRouter.get("/list", clientController.ReturnClients);
clientsRouter.put("/destroy/:id", clientController.DeleteClient);
clientsRouter.post("/", clientController.CreateClient);

module.exports = clientsRouter;