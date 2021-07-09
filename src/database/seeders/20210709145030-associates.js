'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "associates", [{
                    companyName: "Solar Industries",
                    cnpj: "49678200000197",
                    password: "$2a$12$sDpkzK0LcNGO7XQw5KSHPO4DPjFAXbSQTcwVScRERbpIlRwJ1trv6",
                    address: "Rua das Industrias, 1678 - Curitiba/PR",
                },
                {
                    companyName: "Beard Tech",
                    cnpj: "23358450000156",
                    password: "$2a$12$sDpkzK0LcNGO7XQw5KSHPO4DPjFAXbSQTcwVScRERbpIlRwJ1trv6",
                    address: "Rua Eletrônica, 278 - Pinhais/PR",
                },
                {
                    companyName: "Standard Developers",
                    cnpj: "11566854000156",
                    password: "$2a$12$sDpkzK0LcNGO7XQw5KSHPO4DPjFAXbSQTcwVScRERbpIlRwJ1trv6",
                    address: "Rua dos Desenvolvedores, 1789 - Curitiba/PR",
                }
            ], {}
        );
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('associates', null, {});
    }
};