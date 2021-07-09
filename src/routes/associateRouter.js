const express = require("express");
const associateRouter = express.Router();
const associateController = require("../controllers/associateController");

associateRouter.post("/newAssociate", associateController.newAssociate);

module.exports = associateRouter;