const Client = require("../models/Client");
const Sequelize = require("sequelize");
const Mensage = require("../mensage/msg");
//const ClientRepository = require("./clients");


const insert = async (data) => {
    const client = await Client.create(data).catch((err) => {
        console.log(err)
        throw new Mensage("Erro ao inserir o cliente no sistema", 500);
    })
    return client
} 

const update = async (id, data) => {
    const clientUpdated = await Client.update(data, { where: { id: id }}).catch(() => {
        throw new Mensage("Erro ao dar update no cliente", 500);
    });
    return clientUpdated;
}

const findId = async (id) => {
    const client = await Client.findByPk(id)
    .catch(() => {
        throw new Mensage("Erro para encontrar cliente no banco", 500)
    });
    return client
}

const findCNPJ = async (cnpj) => {
    const client = await Client.findOne({
        where: {
            cnpj
        }
    }).catch(() => {
        throw new Mensage("Erro para encontrar o cliente pelo CNPJ", 500);
    });
    return client
}

const findAll = async () => {
    const clients = await Client.findAll({
        order: [["companyName", "ASC"]],
    }).catch(() => {
        throw new Mensage("Erro para encontrar todos os clientes no banco", 500);
    });
    return clients
}


module.exports = {
     async CreateClient(request, response){
        const { cnpj, companyName, address } = request.body
        try {
            
            if(!/^\d+$/.test(cnpj) || !companyName || !address ){
                throw new Mensage("Campos incorretos", 404)
            }
             data = {
                cnpj,
                companyName,
                address,
            };
        const clientAlreadyExists = await findCNPJ(data.cnpj);
        
        if(clientAlreadyExists) {
            throw new Mensage("Client já existe", 404)
        }
    
        const client = await insert(data);
            if(!client){
                throw new Mensage("Não foi possivel criar o cliente", 404)
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
                throw new Mensage("cnpj não informado", 404)
            }
    
            const client = await findCNPJ(cnpj);
            if(!client){
                throw new Mensage("Client não encontrado", 404)
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
            throw new Mensage("Id informado não existe", 404);
        }

        if (!data) {
            throw new Mensage("Informações Inválidas", 404)
        }

        const clientUpdated =  await update(id, data);

        return response.status(201).json({ clientUpdated })

    } catch (err) {
        return response.status(err.statusCode).json({ message: err.message })
    }

},
async DeleteClient(req, res) {
    const id = req.params.id;
    const deletedClient = await Client.destroy({
      where: { id: id },
    }).catch(async (error) => {
      return res.status(403).json({ msg: error });
    });
    if (deletedClient != 0)
      res.status(200).json({ msg: "Cliente excluido com sucesso." });
    else res.status(404).json({ msg: "Cliente não encontrado." });
  }

}


