const express = require("express");
const associateRouter = express.Router();
const associateController = require("../controllers/associateController");
const auth = require("../middlewares/auth");

associateRouter.post("/authentication", associateController.authentication);

associateRouter.post("/newAssociate", associateController.newAssociate);
associateRouter.get("/listAllAssociates", associateController.listAllAssociates);
associateRouter.get("/listAssociateByCpnj/:cnpj", associateController.listAssociateByCpnj);
associateRouter.put("/updateAssociate", associateController.updateAssociate);
associateRouter.delete("/deleteAssociate/:id", associateController.deleteAssociate);

module.exports = associateRouter;