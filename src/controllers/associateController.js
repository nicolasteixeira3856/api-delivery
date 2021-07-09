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

};