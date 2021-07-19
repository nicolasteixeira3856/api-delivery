'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "couriers", [{
                    name: "Elisa Beatriz Simone Vieira",
                    cpf: "24934374973",
                    password: "$2y$12$ASBxRqh7gyFSv3IlI2xtaO0mEGwW1PhmVGZVsvUqOZ9vBtxdrZ/3W",
                    telephone: "41996408556",
                },
                {
                    name: "Fábio Yago Moraes",
                    cpf: "51215291981",
                    password: "$2y$12$ASBxRqh7gyFSv3IlI2xtaO0mEGwW1PhmVGZVsvUqOZ9vBtxdrZ/3W",
                    telephone: "41984471001",
                },
                {
                    name: "Thiago Diego Gabriel Pinto",
                    cpf: "04849669956",
                    password: "$2y$12$ASBxRqh7gyFSv3IlI2xtaO0mEGwW1PhmVGZVsvUqOZ9vBtxdrZ/3W",
                    telephone: "41996408556",
                }
            ], {}
        );
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('couriers', null, {});
    }
};