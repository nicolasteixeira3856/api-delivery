const Delivery = require("../models/Delivery");
const Client = require("../models/Client");

const Courier = require("../models/Courier");
const Sequelize = require("sequelize");


const findId = async (id,type) => {
    const people = await type.findByPk(id);
    return people;
}

const update = async (id, data) => {
    const clientUpdated = await Delivery.update(data, { where: { id:id, status:"pendente"}});
    return clientUpdated;
}

module.exports = {

    async createDelivery(request, response){
        const { description, clientId, courierId, value } = request.body
        try {
            if(!description){             
             response.status(404).json({ msg: "Descrição nao pode ser nula" });
            }
            const clientExists = await findId(clientId,Client);
            if(!clientExists){
                response.status(400).json({ msg: clientExists });
            }
            const CourierExists = await findId(courierId,Courier);
            if(!CourierExists){
                response.status(404).json({ msg: "motoboy não existe" });
              
            }
             data = {
                description,
                clientId,
                courierId,
                status: "pendente",
                value              
            };
                const delivery = await Delivery.create(data).catch((err) => {
     
                    response.status(500).json({ msg: "Erro ao criar a entrega" });
                })
            

            if(!delivery){
                response.status(404).json({ msg: "Entrega não criada" });
            }
    
            return response.status(201).json({ delivery })
    
        } catch (err) {
            return response.status(err.statusCode).json({ message: err.message })
        }
    
    },

    async listFulfilledDeliveries(req, res) {
        const delivery = await Delivery.findAll({
            where: { status: "realizada" },
        }).catch((exception) => {
            console.log(exception);
            res.status(500).json({ msg: "Falha na conexão." });
        });

        if (delivery) {
            res.status(200).json({ delivery });
        } else {
            res.status(404).json({ msg: "Não foi possível encontrar entregas realizadas." });
        }
    },

    async listPendingDeliveries(req, res) {
        const delivery = await Delivery.findAll({
            where: { status: "pendente" },
        }).catch((exception) => {
            console.log(exception);
            res.status(500).json({ msg: "Falha na conexão." });
        });

        if (delivery) {
            res.status(200).json({ delivery });
        } else {
            res.status(404).json({ msg: "Não foi possível encontrar entregas pendentes." });
        }
    },
    async listAll(req, res) {
        const delivery = await Delivery.findAll({
        }).catch((exception) => {
            console.log(exception);
            res.status(500).json({ msg: "Falha na conexão." });
        });

        if (delivery) {
            res.status(200).json({ delivery });
        } else {
            res.status(404).json({ msg: "Não foi possível encontrar entregas realizadas." });
        }
    },
    async EditPending(request, response){
        const id = request.params.id;
        const { description, clientId, courierId, value } = request.body
        try {
            const deliveryAlreadyExists = await findId(id,Delivery);
      
            if(!deliveryAlreadyExists) {
                return response.status(400).json({ message: "Id informado não existe" })
              
            }
            if(!description){             
                response.status(404).json({ msg: "Descrição nao pode ser nula" });
               }
               const clientExists = await findId(clientId,Client);
               if(!clientExists){
                   response.status(400).json({ msg: "cliente não existe" });
               }
               const CourierExists = await findId(courierId,Courier);
               if(!CourierExists){
                   response.status(404).json({ msg: "motoboy não existe" });
                 
               }
            data = {
                description,
                clientId,
                courierId,
                status: deliveryAlreadyExists.status,
                value              
            };
            const deliveryUpdated =  await update(id, data);
    
            return response.status(201).json({ deliveryUpdated })
    
        } catch (err) {
            return response.status(err.statusCode).json({ message: err.message })
        }
    
    },
    async DeletePending(req, response) {
        const id = req.params.id;
        const deletedDelivery = await Delivery.destroy({
          where: { id: id },
        }).catch(async (error) => {
          return res.status(403).json({ msg: error });
        });
        if (deletedDelivery != 0)
        response.status(200).json({ msg: "entrega excluido com sucesso." });
        else response.status(404).json({ msg: "entrega não encontrado." });
      }

};