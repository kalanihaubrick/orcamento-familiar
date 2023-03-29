const Services = require('./Services')
const database = require('../../models')

class ReceitasServices extends Services {
    constructor() {
        super('receitas')
    }
    

}

module.exports = ReceitasServices