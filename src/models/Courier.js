const Sequelize = require("sequelize");

class Courier extends Sequelize.Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            cpf: Sequelize.STRING,
            password: Sequelize.STRING,
            telephone: Sequelize.STRING,
        }, {
            sequelize,
        });
    }

    static associate(models) {
        this.hasMany(models.Delivery, { foreignKey: "courierId" })
    }

}

module.exports = Courier;