const { DespesasServices } = require('../services')
const despesasService = new DespesasServices;
const { Op } = require('sequelize')

class DespesasController {
    static async criarDespesa(req, res) {
        const novaDespesa = req.body;
       try {
        const novaDespesaCriada = await despesasService.criarDespesa(novaDespesa)
        return res.status(201).json(novaDespesaCriada)
       
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }

    static async consultarDespesas(req, res) {
        const { descricao } = req.query
        const where = {}

        descricao ? where.descricao = {[Op.substring]: descricao} : null

        try {
            const todasDespesas = await despesasService.pegaTodosRegistros({where, attributes: ['descricao', 'valor', 'data', 'categoria'] })
            return res.status(200).json(todasDespesas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async consultarPorMes(req, res) {
        const { ano, mes } = req.params
        const primeiroDia = new Date(ano, mes - 1, 1,-3)
        const ultimoDia = new Date(ano, mes, 0)
        try {
            const despesasNoMes = await despesasService.pegaTodosRegistros({
                where: {
                    data: {
                        [Op.between]: [primeiroDia, ultimoDia]
                    }
                }, attributes: ['descricao', 'valor', 'data']
            })
            return res.status(200).json(despesasNoMes)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async consultarUmaDespesa(req, res) {
        const { id } = req.params
        try {
            const umaDespesa = await despesasService.pegaUmRegistro({ id: id })
            if (umaDespesa == null) {
                res.status(404).json({ message: "Não existe despesa com este ID" })
            } else {
                return res.status(200).json(umaDespesa)
            }
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizarDespesa(req, res) {
        const { id } = req.params
        const novasInfos = req.body
        try {
            await despesasService.atualizaRegistro(novasInfos, { id: id })
            const despesaAtualizada = await despesasService.pegaUmRegistro({ id: id })
            if (despesaAtualizada == null) {
                res.status(404).json({ message: "Não existe despesa com este ID" })
            } else {
                return res.status(200).json(despesaAtualizada)
            }
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagarDespesa(req, res) {
        const { id } = req.params

        try {
            const despesa = await despesasService.pegaUmRegistro({ id: id })

            if (despesa == null) {
                res.status(404).json({ message: "Não existe despesa com este ID" })
            } else {
                await despesasService.apagaRegistro({ id: id })
                res.status(200).json({ message: `Despesas de ID ${id} apagado.` })
            }
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = DespesasController;