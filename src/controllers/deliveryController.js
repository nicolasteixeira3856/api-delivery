const Delivery = require("../models/Delivery");
const Client = require("../models/Client");
const Mensage = require("../mensage/msg");
const Courier = require("../models/Courier");
const Sequelize = require("sequelize");


const findId = async (id,type) => {
    const people = await type.findByPk(id)
    .catch(() => {
        throw new Mensage("Erro para encontrar cliente no banco", 500)
    });
    return people;
}

module.exports = {

    async createDelivery(request, response){
        const { description, clientId, courierId, value } = request.body
        try {
            if(!description){
                throw new Mensage("Descrição nao pode ser nula", 400)
            }
            const clientExists = await findId(clientId,Client);
            if(!clientExists){
                response.status(404).json({ msg: clientExists });
            }
            const CourierExists = await findId(courierId,Courier);
            if(!CourierExists){
                throw new Mensage("motoboy não existe", 400)
            }
             data = {
                description,
                clientId,
                courierId,
                status: "pendente",
                value              
            };
                const delivery = await Delivery.create(data).catch((err) => {
     
                    throw new Mensage("Erro ao criar a entrega", 500);
                })
            

            if(!delivery){
                throw new Mensage("Entrega não criada", 404)
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
};