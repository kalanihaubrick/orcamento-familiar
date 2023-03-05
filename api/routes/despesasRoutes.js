const express = require('express')
const DespesasController = require('../controller/DespesasController')

const router = express.Router()

router
    .post('/despesas', DespesasController.criaDespesa)


    module.exports = router;