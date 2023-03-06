const express = require('express')
const DespesasController = require('../controller/DespesasController')

const router = express.Router()

router
    .post('/despesas', DespesasController.criaDespesa)

    .get('/despesas', DespesasController.consultaDespesas)
    .get('/despesas/:id', DespesasController.consultaUmaDespesa)

    .put('/despesas/:id', DespesasController.atualizaDespesa)

    .delete('/despesas/:id', DespesasController.apagaDespesa)
    module.exports = router;