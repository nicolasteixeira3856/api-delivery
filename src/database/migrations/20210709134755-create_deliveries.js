'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable("deliveries", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            clientId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: "Clients", key: "id" },
                onDelete: "CASCADE",
            },
            courierId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: "Couriers", key: "id" },
            },
            status: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            value: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal(
                    "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
                ),
            },
        });
    },

    down: async(queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    }
};