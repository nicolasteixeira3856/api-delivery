const Associate = require("../models/Associate");
const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");

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

module.exports = {
    async newAssociate(req, res) {
        try {
            const { companyName, cnpj, password, address } = req.body;
            if (!companyName || !/^\d+$/.test(cnpj) || !password) {
                res.status(400).json({ msg: "Preencha todos os dados obrigatórios corretamente." });
            } else {

                const passwordValid = passwordValidation(password);

                if (passwordValid !== "OK")
                    return res.status(400).json({ msg: passwordValid });

                const associateExists = await Associate.findOne({
                    where: { cnpj },
                });

                if (associateExists) {
                    res.status(403).json({ msg: "O CNPJ informado já está vinculado a um associado." });
                } else {
                    const salt = bcrypt.genSaltSync(12);
                    const hash = bcrypt.hashSync(password, salt);
                    const associate = await Associate.create({
                        companyName,
                        cnpj,
                        password: hash,
                        address
                    }).catch((error) => {
                        res.status(500).json({ msg: "Não foi possível cadastrar no sistema - " + error });
                    });
                    if (associate)
                        res.status(201).json({ msg: "Associado cadastrado com sucesso." });
                    else
                        res.status(404).json({ msg: "Não foi possível cadastrar um novo associado." });
                }
            }
        } catch (error) {
            res.status(500).json({ msg: "Não foi possivel cadastrar um novo associado - Erro: " + error })
        }
    },

    async listAllAssociates(req, res) {
        const associate = await Associate.findAll({
            order: [
                ["companyName", "ASC"]
            ],
        }).catch((exception) => {
            console.log(exception);
            res.status(500).json({ msg: "Falha na conexão." });
        });

        if (associate) {
            res.status(200).json({ associate });
        } else {
            res.status(404).json({ msg: "Não foi possível encontrar associados." });
        }
    },

    async listAssociateByCpnj(req, res) {
        try {
            const associateCnpj = req.params.cnpj;
            if (!associateCnpj) {
                res.status(400).json({ msg: "Associado não informado." });
            }

            const associate = await Associate.findOne({
                where: { cnpj: associateCnpj },
            });

            if (associate) {
                if (associate == "")
                    res.status(404).json({ msg: "Não foi possível encontrar o associado." });
                else
                    res.status(200).json({ associate });
            } else {
                res.status(404).json({ msg: "Não foi possível encontrar o associado." });
            }
        } catch (error) {
            console.log(error);
            res.status(404).json({ msg: "Não foi possível encontrar o associado." });
        }
    },

    async updateAssociate(req, res) {
        const associateId = req.body.id;
        const associate = req.body;

        if (!associateId) {
            res.status(400).json({ msg: "ID do associado não foi informado." });
        }

        if (!associate.companyName || !/^\d+$/.test(associate.cnpj) || !associate.password) {
            res.status(400).json({ msg: "Preencha todos os dados obrigatórios corretamente." });
        } else {

            const associateCnpjExists = await Associate.findOne({
                where: { cnpj: associate.cnpj },
            });

            if (associateCnpjExists) {
                if (associateCnpjExists.cnpj === associate.cnpj) {
                    const associateExists = await Associate.findByPk(associateId);
                    if (!associateExists) {
                        res.status(404).json({ msg: "Associado não encontrado." });
                    } else {
                        if (associate.companyName || associate.cnpj || associate.password) {
                            await Associate.update(associate, { where: { id: associateId }, });
                            return res.status(200).json({ msg: "Associado editado com sucesso." });
                        } else {
                            res.status(400).json({ msg: "Dados obrigatórios não preenchidos." });
                        }
                    }
                } else {
                    res.status(500).json({ msg: "CNPJ duplicado, apenas um associado por CNPJ." });
                }
            } else {
                const associateExists = await Associate.findByPk(associateId);
                if (!associateExists) {
                    res.status(404).json({ msg: "Associado não encontrado." });
                } else {
                    if (associate.companyName || associate.cnpj || associate.password) {
                        await Associate.update(associate, { where: { id: associateId }, });
                        return res.status(200).json({ msg: "Associado editado com sucesso." });
                    } else {
                        res.status(400).json({ msg: "Dados obrigatórios não preenchidos." });
                    }
                }
            }
        }
    },

    async deleteAssociate(req, res) {
        let id = req.params.id

        if (id === undefined || id === null) {
            res.status(404).json({ msg: "ID do associado não foi informado." })
        } else {
            id = Number(id)
            const associate = await Associate.destroy({
                where: { id: id }
            }).catch((error) => {
                res.status(500).json({ msg: "Não foi possível excluir o associado!" })
            })
            if (associate != 0)
                res.status(200).json({ msg: "Associado excluido com sucesso!" })
            else
                res.status(404).json({ msg: "Não foi possível excluir o associado!" })
        }
    },

};