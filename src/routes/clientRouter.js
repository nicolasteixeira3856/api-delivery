const express = require("express");
const clientsRouter = express.Router();
const clientController = require("../controllers/clientsController");
const auth = require("../middlewares/auth");

clientsRouter.post("/authentication", clientController.authentication);

clientsRouter.put("/:id", clientController.EditClient);
clientsRouter.get("/find/:cnpj",auth, clientController.FindByCnpj)
clientsRouter.get("/list",auth, clientController.ReturnClients);
clientsRouter.delete("/destroy/:id",auth, clientController.DeleteClient);
clientsRouter.post("/", clientController.CreateClient);

module.exports = clientsRouter;