'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "deliveries", [{
                    description: "Entrega de e-juice.",
                    clientId: 1,
                    courierId: 1,
                    status: "realizada",
                    value: "25.20",
                },
                {
                    description: "Console PS4 Pro.",
                    clientId: 2,
                    courierId: 2,
                    status: "realizada",
                    value: "100,50",
                },
                {
                    description: "Nvidia RTX 3070 Ti",
                    clientId: 3,
                    courierId: 3,
                    status: "pendente",
                    value: "200,50",
                }
            ], {}
        );
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('deliveries', null, {});
    }
};