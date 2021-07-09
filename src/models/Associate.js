const Sequelize = require("sequelize");

class Associate extends Sequelize.Model {
    static init(sequelize) {
        super.init({
            companyName: Sequelize.STRING,
            cnpj: Sequelize.STRING,
            password: Sequelize.STRING,
            address: Sequelize.STRING,
        }, {
            sequelize,
        });
    }

}

module.exports = Associate;