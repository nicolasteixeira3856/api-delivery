const express = require("express");
const associateRouter = require("./associateRouter");
const deliveryRouter = require("./deliveryRouter");
const clientsRouter = require("./clientRouter");
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json("Bem-vindo a API de Delivery");
});

router.use("/associates", associateRouter);
router.use("/deliveries", deliveryRouter);
router.use("/clients",clientsRouter );

module.exports = router;