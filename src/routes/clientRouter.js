const express = require("express");
const clientsRouter = express.Router();
const clientController = require("../controllers/clients");

clientsRouter.put("/:id", clientController.editClientById);
clientsRouter.get("/find/:cnpj", clientController.listClientByCNPJ)
clientsRouter.get("/list", clientController.listClients);
clientsRouter.post("/", clientController.createClient)

module.exports = clientsRouter;