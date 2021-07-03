const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json("Bem-vindo a API de Delivery");
});

module.exports = router;