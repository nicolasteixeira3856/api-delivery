const Sequelize = require("sequelize");

class Delivery extends Sequelize.Model {
    static init(sequelize) {
        super.init({
            description: Sequelize.STRING,
            status: Sequelize.STRING,
            value: Sequelize.STRING,
        }, {
            sequelize,
        });
    }

    static associate(models) {
        this.belongsTo(models.Client, { foreignKey: "clientId" });
        this.belongsTo(models.Courier, { foreignKey: "courierId" });
    }

}

module.exports = Delivery;