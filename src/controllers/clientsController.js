const Client = require("../models/Client");
const Sequelize = require("sequelize");



const insert = async (data) => {
    const client = await Client.create(data)
    return client
} 

const update = async (id, data) => {
    const clientUpdated = await Client.update(data, { where: { id: id }});
    return clientUpdated;
}

const findId = async (id) => {
    const client = await Client.findByPk(id);
    return client
}

const findCNPJ = async (cnpj) => {
    const client = await Client.findOne({
        where: {
            cnpj
        }
    });
    return client
}

const findAll = async () => {
    const clients = await Client.findAll({
        order: [["companyName", "ASC"]],
    });
    return clients
}


module.exports = {
     async CreateClient(request, response){
        const { cnpj, companyName, address } = request.body
        try {
            
            if(!/^\d+$/.test(cnpj) || !companyName || !address ){
                return response.status(404).json({ message: "dados incorretos" })
            }
            
             data = {
                cnpj,
                companyName,
                address,
            };
        const clientAlreadyExists = await findCNPJ(data.cnpj);
        
        if(clientAlreadyExists) {
            return response.status(404).json({ message: "Cliente já cadastrado" })
        }
    
        const client = await insert(data);
            if(!client){
                return response.status(404).json({ message: "Não foi possivel criar o cliente" })
                
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
                
                return response.status(404).json({ message: "cnpj não informado" })
            }
    
            const client = await findCNPJ(cnpj);
            if(!client){
                return response.status(404).json({ message: "Client não encontrado" })
                
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
            return response.status(404).json({ message: "Id informado não existe" })
          
        }
        const clientCnpjExists = await findCNPJ(data.cnpj);
        
        if(clientCnpjExists) {
            return response.status(404).json({ message: "Cliente já cadastrado" })
        }
    

        if (!data) {
            return response.status(404).json({ message: "Informações Inválidas" })
            
        }

        const clientUpdated =  await update(id, data);

        return response.status(201).json({ clientUpdated })

    } catch (err) {
        return response.status(err.statusCode).json({ message: err.message })
    }

},
async DeleteClient(req, response) {
    const id = req.params.id;
    const deletedClient = await Client.destroy({
      where: { id: id },
    }).catch(async (error) => {
      return res.status(403).json({ msg: error });
    });
    if (deletedClient != 0)
    response.status(200).json({ msg: "Cliente excluido com sucesso." });
    else response.status(404).json({ msg: "Cliente não encontrado." });
  }

}


