const Client = require("../models/Client");
const Sequelize = require("sequelize");
const AppError = require("../errors/AppError");
//const ClientRepository = require("./clients");


const insert = async (data) => {
    const client = await Client.create(data).catch((err) => {
        console.log(err)
        throw new AppError("Erro ao inserir o cliente no sistema", 500);
    })
    return client
} 

const update = async (id, data) => {
    const clientUpdated = await Client.update(data, { where: { id: id }}).catch(() => {
        throw new AppError("Erro ao dar update no cliente", 500);
    });
    return clientUpdated;
}

const findId = async (id) => {
    const client = await Client.findByPk(id)
    .catch(() => {
        throw new AppError("Erro para encontrar cliente no banco", 500)
    });
    return client
}

const findCNPJ = async (cnpj) => {
    const client = await Client.findOne({
        where: {
            cnpj
        }
    }).catch(() => {
        throw new AppError("Erro para encontrar o cliente pelo CNPJ", 500);
    });
    return client
}

const findAll = async () => {
    const clients = await Client.findAll({
        order: [["companyName", "ASC"]],
    }).catch(() => {
        throw new AppError("Erro para encontrar todos os clientes no banco", 500);
    });
    return clients
}


module.exports = {
     async CreateClient(request, response){
        const { cnpj, companyName, address } = request.body
        try {
            
            if(!/^\d+$/.test(cnpj) || !companyName || !address ){
                throw new AppError("Campos incorretos", 404)
            }
             data = {
                cnpj,
                companyName,
                address,
            };
        const clientAlreadyExists = await findCNPJ(data.cnpj);
        
        if(clientAlreadyExists) {
            throw new AppError("Client já existe", 404)
        }
    
        const client = await insert(data);
            if(!client){
                throw new AppError("Não foi possivel criar o cliente", 404)
            }
    
            return response.status(201).json({ client })
    
        } catch (err) {
            return response.status(err.statusCode).json({ message: err.message })
        }
    
    },

    async FindByCnpj(request, response){
        let cnpj = request.params.cnpj
        try {
            
            if(!cnpj){
                throw new AppError("cnpj não informado", 404)
            }
    
            const client = await findCNPJ(cnpj);
            if(!client){
                throw new AppError("Client não encontrado", 404)
            }
    
            return response.status(201).json({ client })
    
        } catch (err) {
            return response.status(err.statusCode).json({ message: err.message })
        }
    },
        async ReturnClients(_, response){
    
            try {
    
                const allClients = await findAll();
    
                return response.status(201).json({ clients: allClients })
    
            } catch (err) {
                return response.status(err.statusCode).json({ message: err.message })
            }
    
        },        
  async EditClient(request, response){
    const id = request.params.id;
    const data = request.body;

    try {
        const clientAlreadyExists = await findId(id);
        if(!clientAlreadyExists) {
            throw new AppError("Id informado não existe", 404);
        }

        if (!data) {
            throw new AppError("Informações Inválidas", 404)
        }

        const clientUpdated =  await update(id, data);

        return response.status(201).json({ clientUpdated })

    } catch (err) {
        return response.status(err.statusCode).json({ message: err.message })
    }

}

}


