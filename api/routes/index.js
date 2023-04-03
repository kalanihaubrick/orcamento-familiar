const bodyParser = require('body-parser')
const receitas = require('./receitasRoutes')
const despesas = require('./despesasRoutes')
const resumo = require('./resumosRoutes')

module.exports = app => {
    app.use(bodyParser.json(),
    receitas,
    despesas,
    resumo
    )
}