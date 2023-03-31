const database = require('../../models/index')
const { Op } = require('sequelize')

class Services {
    constructor(nomeDoModelo) {
        this.nomeDoModelo = nomeDoModelo
    }
    async criarRegistro(dados) {
        const [ano, mes, dia] = dados.data.split('-');
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

    async pegarUmRegistro(id, attributes) {
        return database[this.nomeDoModelo].findOne({ where: { id: id }, attributes })
    }

    async pegarTodosRegistros(descricao, attributes) {
        const where = {}
        descricao ? where.descricao = { [Op.substring]: descricao } : null;
        return database[this.nomeDoModelo].findAll({ where, attributes: attributes })
    }

    async pegarTodosRegistrosPorMes(ano, mes, attributes) {
        return database[this.nomeDoModelo].findAll({
            where: {
                data: {
                    [Op.between]: [new Date(ano, mes - 1, 1), new Date(ano, mes, 0)]
                }
            }, attributes: attributes
        })
    }

    async atualizarRegistro(dados, id) {
        const dado = await database[this.nomeDoModelo].findOne({ where: { id: id } })
        const [ano, mes, dia] = dados.data ? dados.data.split('-') : dado.data.split('-')
        const checkRegistro = await database[this.nomeDoModelo].findOne({
            where: {
                descricao: dados.descricao || dado.descricao,
                data: {
                    [Op.and]: {
                        [Op.gte]: new Date(ano, mes - 1, 1 - 3),
                        [Op.lte]: new Date(ano, mes, 0)
                    }
                },
                id: { [Op.ne]: id }
            }
        })
        if (checkRegistro) {
            throw new Error('Já existe um registro com essa descrição dentro do mês')
        } else {
            return database[this.nomeDoModelo].update(dados, { where: { id: id } })
        }
    }

    async apagarRegistro(id) {
        return database[this.nomeDoModelo].destroy({ where: { id: id } })
    }

}

module.exports = Services;