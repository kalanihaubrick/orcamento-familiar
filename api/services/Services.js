const database = require('../../models/index')
const { Op } = require('sequelize')

class Services {
    constructor(nomeDoModelo) {
        this.nomeDoModelo = nomeDoModelo
    }
    async criarRegistro(dados) {
        const [ano, mes, dia] = dados.data.split('-');
        dados.data = new Date(ano, mes - 1, dia);

        const dadoExistente = await database[this.nomeDoModelo].findOne({
            where: {
                descricao: dados.descricao,
                data: {
                    [Op.and]: [
                        { [Op.gte]: new Date(ano, mes - 1, 1, -3) },
                        { [Op.lt]: new Date(ano, mes, 0) }
                    ]
                }
            }
        });

        if (!dadoExistente) {
            return await database[this.nomeDoModelo].create(dados)
        } else {
            throw new Error(`Dados já existe na tabela de ${this.nomeDoModelo}`)
        }
    }

    async pegaUmRegistro(where = {}) {
        return database[this.nomeDoModelo].findOne({ where: { ...where } })
    }

    async pegaTodosRegistros(where = {}) {
        return database[this.nomeDoModelo].findAll({ ...where })
    }

    async atualizaRegistro(dados, where = {}) {
        return database[this.nomeDoModelo].update(dados, { where: { ...where } })
    }

    async apagaRegistro(where = {}) {
        return database[this.nomeDoModelo].destroy({ where: { ...where } })
    }

}

module.exports = Services;