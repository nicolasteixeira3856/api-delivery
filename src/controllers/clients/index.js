const editClientByIdController = require("./editClientById/editClientByIdController");
const listClientsController = require("./listClients/listClientsController");
const createClientController = require("./createClient/createClientController");

module.exports = {
    editClientById: editClientByIdController.handle,
    listClients: listClientsController.handleList,
    listClientByCNPJ: listClientsController.handle,
    createClient: createClientController.handle
}