const bodyParser = require('body-parser')
const receitas = require('./receitasRoutes')

module.exports = app => {
    app.use(bodyParser.json(),
    receitas)
}