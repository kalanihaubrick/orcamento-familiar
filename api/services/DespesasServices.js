const database = require('../../models')
const Services = require('./Services')
const { Op } = require('sequelize')


class DespesasServices extends Services {
    constructor() {
        super('despesas')
    }
    async criarDespesa(dados) {
        const categoriasPermitidas = ['alimentação', 'saúde', 'moradia', 'transporte', 'educação', 'lazer', 'imprevistos', 'outros']
        const [ano, mes, dia] = dados.data.split('-');
        dados.data = new Date(ano, mes - 1, dia);

        const despesaExistente = await database[this.nomeDoModelo].findOne({
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

        if (despesaExistente) {
            throw new Error("Despesa já cadastrada dentro do mês")
        } else {
            if (!dados.categoria) {
                dados.categoria = 'outros';
            } else if (!categoriasPermitidas.includes(dados.categoria)) {
                throw new Error(`A categoria deve ser uma das categorias permitidas: ${categoriasPermitidas}`)
            }
            return await database[this.nomeDoModelo].create(dados)
        }
    }
}

module.exports = DespesasServices;