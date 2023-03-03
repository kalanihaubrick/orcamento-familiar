const express = require('express')
const ReceitasController = require('../controller/ReceitasController')

const router = express.Router();

router
    .post('/receitas', ReceitasController.criaReceita)

    .get('/receitas', ReceitasController.consultaReceitas)
    .get('/receitas/:id', ReceitasController.consultaUmaReceita)

    .put('/receitas/:id', ReceitasController.atualizaReceita)

    .delete('/receitas/:id', ReceitasController.apagaReceita)

module.exports = router;