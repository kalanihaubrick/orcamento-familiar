const Services = require('./Services')
const database = require('../../models')

class ReceitasServices extends Services {
    constructor() {
        super('receitas')
    }
    async contaReceitas(where = {}) {
        return database[this.nomeDoModelo].findAndCountAll({ where: { ...where } })
    }

}

module.exports = ReceitasServices