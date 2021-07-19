const Sequelize = require("sequelize");

class Delivery extends Sequelize.Model {
    static init(sequelize) {
        super.init({
            description: Sequelize.STRING,
            status: Sequelize.STRING,
            value: Sequelize.FLOAT,
        }, {
            sequelize,
        });
    }

    static associate(models) {
        this.belongsTo(models.Client, { foreignKey: "clientId", onDelete: 'cascade', hooks:true});
        this.belongsTo(models.Courier, { foreignKey: "courierId" });
    }

}

module.exports = Delivery;