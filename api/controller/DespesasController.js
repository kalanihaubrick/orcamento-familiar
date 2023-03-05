const { DespesasServices } = require('../services')
const despesasService = new DespesasServices;
const { Op } = require('sequelize')

class DespesasController {
    static async criaDespesa(req, res) {
        const novaDespesa = req.body;
        try {
            const [ano, mes, dia] = novaDespesa.data.split('-');
            novaDespesa.data = new Date(ano, mes - 1, dia);

            const despesaExistente = await despesasService.pegaUmRegistro({
                descricao: novaDespesa.descricao,
                data: {
                    [Op.and]: [
                        { [Op.gte]: new Date(ano, mes - 1, 1) },
                        { [Op.lt]: new Date(ano, mes, 0) }
                    ]
                }
            }
            );

            if (despesaExistente) {
                return res.status(400).json({ message: "Despesa já cadastrada dentro do mês" })
            } else {
                const novaDespesaCriada = await despesasService.criaRegistro(novaDespesa)
                return res.status(201).json(novaDespesaCriada)
            }
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = DespesasController;