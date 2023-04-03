const { Op } = require('sequelize')
const database = require('../../models')
const Services = require('./Services')

class ResumosServices extends Services {
    constructor() {
        super('receitas', 'despesas')
    }

    async pegarResumoMes(ano, mes) {
        const receitas = await database['receitas'].sum('valor',{
            where: {
                data: {
                    [Op.and]: {
                        [Op.gte]: new Date(ano, mes - 1, 1, -3),
                        [Op.lte]: new Date(ano, mes, 0)
                    }
                }
            }
        })

        const despesas = await database['despesas'].sum('valor',{
            where: {
                data: {
                    [Op.and]: {
                        [Op.gte]: new Date(ano, mes - 1, 1, -3),
                        [Op.lte]: new Date(ano, mes, 0)
                    }
                }
            }
        })

        const categorias = await database['despesas'].findAll({
            where: {
                data: {
                    [Op.and]: {
                        [Op.gte]: new Date(ano, mes - 1, 1, -3),
                        [Op.lte]: new Date(ano, mes, 0)
                    }
                }
            }, attributes: ['categoria',[database.Sequelize.fn('sum', database.Sequelize.col('valor')), 'total']],
            group: ['categoria']
        })

        const saldo = receitas - despesas;

        return {
            receitas,
            despesas,
            saldo,
            categorias
        }
    }
}

module.exports = ResumosServices