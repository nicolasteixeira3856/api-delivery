'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "clients", [{
                    companyName: "Emilly e Nicolas Telecom Ltda",
                    cnpj: "92868852000113",
                    address: "Rua Campos Novos, 893 - Campo Largo/PR",
                },
                {
                    companyName: "Andrea e Vitor Pizzaria ME",
                    cnpj: "18665257000128",
                    address: "Avenida Nossa Senhora Aparecida, 662 - Curitiba/PR",
                },
                {
                    companyName: "Mateus e Emily Gráfica Ltda",
                    cnpj: "75750088000168",
                    address: "Rua Bôrtolo Parise, 811 - Curitiba/PR",
                }
            ], {}
        );
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('clients', null, {});
    }
};