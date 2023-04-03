const express = require('express')
const ResumosController = require('../controller/ResumosController')

const router = express.Router()

router
    .get('/resumo/:ano/:mes', ResumosController.pegarResumoMes)

module.exports = router;