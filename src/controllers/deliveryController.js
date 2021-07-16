const Delivery = require("../models/Delivery");
const Sequelize = require("sequelize");

module.exports = {
    async listFulfilledDeliveries(req, res) {
        const delivery = await Delivery.findAll({
            where: { status: "realizada" },
        }).catch((exception) => {
            console.log(exception);
            res.status(500).json({ msg: "Falha na conexão." });
        });

        if (delivery) {
            res.status(200).json({ delivery });
        } else {
            res.status(404).json({ msg: "Não foi possível encontrar entregas realizadas." });
        }
    },

    async listPendingDeliveries(req, res) {
        const delivery = await Delivery.findAll({
            where: { status: "pendente" },
        }).catch((exception) => {
            console.log(exception);
            res.status(500).json({ msg: "Falha na conexão." });
        });

        if (delivery) {
            res.status(200).json({ delivery });
        } else {
            res.status(404).json({ msg: "Não foi possível encontrar entregas pendentes." });
        }
    },
};