const AppError = require("../../../errors/AppError");
const ClientRepository = require("../ClientRepo/clientRepo");

const handle = async (request, response) => {
    let cnpj = request.params.cnpj
    try {
        
        if(!cnpj){
            throw new AppError("cnpj não informado", 404)
        }

        const client = await ClientRepository.findClientByCNPJ(cnpj);
        if(!client){
            throw new AppError("Client não encontrado", 404)
        }

        return response.status(201).json({ client })

    } catch (err) {
        return response.status(err.statusCode).json({ message: err.message })
    }
}
    const handleList = async (_, response) => {

        try {

            const allClients = await ClientRepository.findAllClients();

            return response.status(201).json({ clients: allClients })

        } catch (err) {
            return response.status(err.statusCode).json({ message: err.message })
        }

    }
module.exports = {
    handle,
    handleList
};