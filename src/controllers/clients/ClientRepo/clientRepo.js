const AppError = require("../../../errors/AppError"); 
const Client = require("../../../models/Client");

const createClient = async (data) => {
    const client = await Client.create(data).catch((err) => {
        console.log(err)
        throw new AppError("Erro ao inserir o cliente no sistema", 500);
    })
    return client
} 

const updateById = async (id, data) => {
    const clientUpdated = await Client.update(data, { where: { id: id }}).catch(() => {
        throw new AppError("Erro ao dar update no cliente", 500);
    });
    return clientUpdated;
}

const findById = async (id) => {
    const client = await Client.findByPk(id)
    .catch(() => {
        throw new AppError("Erro para encontrar cliente no banco", 500)
    });
    return client
}

const findClientByCNPJ = async (cnpj) => {
    const client = await Client.findOne({
        where: {
            cnpj
        }
    }).catch(() => {
        throw new AppError("Erro para encontrar o cliente pelo CNPJ", 500);
    });
    return client
}

const findAllClients = async () => {
    const clients = await Client.findAll({
        order: [["companyName", "ASC"]],
    }).catch(() => {
        throw new AppError("Erro para encontrar todos os clientes no banco", 500);
    });
    return clients
}

module.exports = {
    createClient,
    updateById,
    findById,
    findAllClients,
    findClientByCNPJ
}