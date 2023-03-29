const express = require('express')
const DespesasController = require('../controller/DespesasController')

const router = express.Router()

router
    .post('/despesas', DespesasController.criarDespesa)

    .get('/despesas', DespesasController.consultarDespesas)
    .get('/despesas/:id', DespesasController.consultarUmaDespesa)
    .get('/despesas/:ano/:mes', DespesasController.consultarPorMes)

    .put('/despesas/:id', DespesasController.atualizarDespesa)

    .delete('/despesas/:id', DespesasController.apagarDespesa)
    module.exports = router;