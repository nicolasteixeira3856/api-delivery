const AppError = require("../../../errors/AppError");
const ClientRepository = require("../ClientRepo/clientRepo");


const handle = async (request, response) => {
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
    const clientAlreadyExists = await ClientRepository.findClientByCNPJ(data.cnpj);
    
    if(clientAlreadyExists) {
        throw new AppError("Client já existe", 404)
    }

    const client = await ClientRepository.createClient(data);
        if(!client){
            throw new AppError("Não foi possivel criar o cliente", 404)
        }

        return response.status(201).json({ client })

    } catch (err) {
        return response.status(err.statusCode).json({ message: err.message })
    }

}

module.exports = {
    handle
};