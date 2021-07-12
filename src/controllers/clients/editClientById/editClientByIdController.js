const AppError = require("../../../errors/AppError");
const ClientRepository = require("../ClientRepo/clientRepo");


const handle = async (request, response) => {
    const id = request.params.id;
    const data = request.body;

    try {
        
        if(!id) {
            throw new AppError("Id informado não existe", 404);
        }

        if (!data) {
            throw new AppError("Informações Inválidas", 404)
        }

        const clientUpdated =  await ClientRepository.updateById(id, data);

        return response.status(201).json({ clientUpdated })

    } catch (err) {
        return response.status(err.statusCode).json({ message: err.message })
    }

}

module.exports = {
    handle
};