const Sequelize = require("sequelize");

class Client extends Sequelize.Model {
    static init(sequelize) {
        super.init({
            companyName: Sequelize.STRING,
            cnpj: Sequelize.STRING,
            address: Sequelize.STRING,
        }, {
            sequelize,
        });
    }

    static associate(models) {
        this.hasMany(models.Delivery, { foreignKey: "clientId", onDelete: 'cascade', hooks:true})
    }

}

module.exports = Client;