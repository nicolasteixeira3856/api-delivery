const Sequelize = require("sequelize");
const dbConfig = require("./config/dbconfig");

const Associate = require("../models/Associate");
const Client = require("../models/Client");
const Courier = require("../models/Courier");
const Delivery = require("../models/Delivery");

const connection = new Sequelize(dbConfig);

Associate.init(connection);
Client.init(connection);
Courier.init(connection);
Delivery.init(connection);

Client.associate(connection.models);
Courier.associate(connection.models);
Delivery.associate(connection.models);

module.exports = connection;