const { ResumosServices } = require('../services')
const resumosServices = new ResumosServices

class ResumosController {
    static async pegarResumoMes(req, res) {
        const { ano, mes } = req.params
        try {
            const resumo = await resumosServices.pegarResumoMes(ano,mes)
            return res.status(200).json(resumo)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}


module.exports = ResumosController;