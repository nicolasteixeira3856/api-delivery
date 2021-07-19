const Delivery = require("../models/Delivery");
const Sequelize = require("sequelize");
const Courier = require("../models/Courier");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


function generateToken(id) {
    process.env.JWT_SECRET = Math.random().toString(36).slice(-20);
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: 18000, // Token expira em 5 horas
    });
    return token;
  }

function passwordValidation(password) {
    if (password.length < 8)
        return "Senha deve ter no mínimo 8 caracteres.";
    else if (!password.match(/[a-zA-Z]/g))
        return "Senha deve ter no mínimo uma letra.";
    else if (!password.match(/[0-9]+/))
        return "Senha deve ter no mínimo um número.";
    //else if (!password.match((/?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#;$%*(){}_+^&]/)))
    //return "Senha deve ter no mínimo um caracter especial.";
    else
        return "OK";
}

const update = async (id, data) => {
    const courierUpdated = await Courier.update(data, { where: { id: id }}).catch(() => {
        throw new AppError("Erro ao dar update no motoboy", 500);
    });
    return courierUpdated;
}

const findId = async (id) => {
    const courier = await Courier.findByPk(id)
    .catch(() => {
        throw new AppError("Erro para encontrar motoboy no banco", 500)
    });
    return courier
}

const findCPF = async (cpf) => {
    const courier = await Courier.findOne({
        where: {
            cpf
        }
    }).catch(() => {
        throw new AppError("Erro para encontrar o motoboy pelo CPF", 500);
    });
    return courier
}

const findAll = async () => {
    const courier = await Courier.findAll({
        order: [["name", "ASC"]],
    }).catch(() => {
        throw new AppError("Erro para encontrar todos os Motoboys no banco", 500);
    });
    return courier
}


module.exports = {

    async authentication(req, res) {
		const cpf = req.body.cpf;
		const password = req.body.password;
		if (!cpf || !password)
			return res.status(400).json({ msg: "Campos obrigatórios vazios!" });
		try {
			const courier  = await Courier.findOne({
				where: { cpf },
			});
			if (!courier )
				return res.status(404).json({ msg: "Usuário ou senha inválidos." });
			else {
				if (bcrypt.compareSync(password, courier.password)) {
					const token = generateToken(courier.id);
					return res
						.status(200)
						.json({ msg: "Autenticado com sucesso", token });
				} else
					return res.status(404).json({ msg: "Usuário ou senha inválidos." });
			}
		} catch (error) {
			res.status(500).json(error);
		}
	},

    async newCourier(req, res) {
        try {
            const { name, cpf, password, telephone } = req.body;
            if (!name || !/^\d+$/.test(cpf) || !password || !telephone) {
                res.status(400).json({ msg: "Preencha todos os dados obrigatórios corretamente." });
            } else {

                const passwordValid = passwordValidation(password);

                if (passwordValid !== "OK")
                    return res.status(400).json({ msg: passwordValid });

                const courierExists = await Courier.findOne({
                    where: { cpf },
                });

                if (courierExists) {
                    res.status(403).json({ msg: "O CPF informado já está vinculado a um motoboy." });
                } else {
                    const salt = bcrypt.genSaltSync(12);
                    const hash = bcrypt.hashSync(password, salt);
                    const courier = await Courier.create({
                        name,
                        cpf,
                        password: hash,
                        telephone
                    }).catch((error) => {
                        res.status(500).json({ msg: "Não foi possível cadastrar no sistema - " + error });
                    });
                    if (courier)
                        res.status(201).json({ msg: "Motoboy cadastrado com sucesso." });
                    else
                        res.status(404).json({ msg: "Não foi possível cadastrar um novo motoboy." });
                }
            }
        } catch (error) {
            res.status(500).json({ msg: "Não foi possivel cadastrar um novo motoboy - Erro: " + error })
        }
    },


    async listAllCouriers(req, res) {
        const courier = await Courier.findAll({
            order: [
                ["name", "ASC"]
            ],
        }).catch((exception) => {
            console.log(exception);
            res.status(500).json({ msg: "Falha na conexão." });
        });

        if (courier) {
            res.status(200).json({ courier });
        } else {
            res.status(404).json({ msg: "Não foi possível encontrar associados." });
        }
    },

    async FindByCPF(request, response){
        let cpf = request.params.cpf
        try {
            
            if(!cpf){
                throw new AppError("cnpj não informado", 404)
            }
    
            const courier = await findCPF(cpf);
            if(!courier){
                throw new AppError("motoboy não encontrado", 404)
            }
    
            return response.status(201).json({ courier })
    
        } catch (err) {
            return response.status(err.statusCode).json({ message: err.message })
        }
    },    


    async updateCourier(req, res) {
        const courierId = req.body.id;
        const courier = req.body;

        if (!courierId) {
            res.status(400).json({ msg: "ID do motoboy não foi informado." });
        }

        if (!courier.name || !/^\d+$/.test(courier.cpf) || !courier.telephone) {
            res.status(400).json({ msg: "Preencha todos os dados obrigatórios corretamente." });
        } else {

            const courierCpfExists = await Courier.findOne({
                where: { cpf: courier.cpf },
            });

            if (courierCpfExists) {
                if (courierCpfExists.cpf === courier.cpf) {
                    const courierExists = await Courier.findByPk(courierId);
                    if (!courierExists) {
                        res.status(404).json({ msg: "Motoboy não encontrado." });
                    } else {
                        if (courier.name || courier.cpf ||  courier.telephone) {
                            await Courier.update(courier, { where: { id: courierId }, });
                            return res.status(200).json({ msg: "Motoboy editado com sucesso." });
                        } else {
                            res.status(400).json({ msg: "Dados obrigatórios não preenchidos." });
                        }
                    }
                } else {
                    res.status(500).json({ msg: "CPF duplicado, apenas um motoboy por CPF." });
                }
            } else {
                const courierExists = await Courier.findByPk(courierId);
                if (!courierExists) {
                    res.status(404).json({ msg: "Motoboy não encontrado." });
                } else {
                    if (courier.name || courier.cpf || courier.password || courier.telephone) {
                        await Courier.update(courier, { where: { id: courierId }, });
                        return res.status(200).json({ msg: "Motoboy editado com sucesso." });
                    } else {
                        res.status(400).json({ msg: "Dados obrigatórios não preenchidos." });
                    }
                }
            }
        }
    },

    async deleteCourier(req, res) {
        let id = req.params.id

        if (id === undefined || id === null) {
            res.status(404).json({ msg: "ID do motoboy não foi informado." })
        } else {
            id = Number(id)
            const courier = await Courier.destroy({
                where: { id: id }
            }).catch((error) => {
                res.status(500).json({ msg: "Não foi possível excluir o motoboy!" })
            })
            if (courier != 0)
                res.status(200).json({ msg: "Motoboy excluido com sucesso!" })
            else
                res.status(404).json({ msg: "Não foi possível excluir o motoboy!" })
        }
    },
}
