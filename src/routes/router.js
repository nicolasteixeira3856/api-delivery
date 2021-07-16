const express = require("express");
const associateRouter = require("./associateRouter");
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json("Bem-vindo a API de Delivery");
});

router.use("/associates", associateRouter);

module.exports = router;