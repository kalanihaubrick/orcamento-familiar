const database = require('../../models/index')

class Services {
    constructor(nomeDoModelo) {
        this.nomeDoModelo = nomeDoModelo
    }
    async criaRegistro(dados) {
        return database[this.nomeDoModelo].create(dados)
    }

    async pegaUmRegistro(where = {}) {
        return database[this.nomeDoModelo].findOne({ where: { ...where } })
    }

    async pegaTodosRegistros(where = {}) {
        return database[this.nomeDoModelo].findAll({...where})
    }

    async atualizaRegistro(dados, where = {}) {
        return database[this.nomeDoModelo].update(dados, { where: { ...where } })
    }

    async apagaRegistro(where = {}) {
        return database[this.nomeDoModelo].destroy({ where: { ...where } })
    }
}

module.exports = Services;