const express = require('express')
const ReceitasController = require('../controller/ReceitasController')

const router = express.Router();

router
    .post('/receitas', ReceitasController.criarReceita)

    .get('/receitas', ReceitasController.consultarReceitas)
    .get('/receitas/:id', ReceitasController.consultarUmaReceita)
    .get('/receitas/:ano/:mes', ReceitasController.consultarPorMes)

    .put('/receitas/:id', ReceitasController.atualizarReceita)

    .delete('/receitas/:id', ReceitasController.apagarReceita)

module.exports = router;