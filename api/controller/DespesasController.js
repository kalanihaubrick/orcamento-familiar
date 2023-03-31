const { DespesasServices } = require('../services')
const despesasService = new DespesasServices;
const { Op } = require('sequelize')

const attributes = ['descricao', 'valor', 'data', 'categoria']

class DespesasController {
    static async criarDespesa(req, res) {
        const novaDespesa = req.body;
        try {
            const novaDespesaCriada = await despesasService.criarDespesa(novaDespesa)
            return res.status(201).json(novaDespesaCriada)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    static async consultarDespesas(req, res) {
        const { descricao } = req.query
        try {
            const todasDespesas = await despesasService.pegarTodosRegistros(descricao, attributes)
            return res.status(200).json(todasDespesas)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    static async consultarPorMes(req, res) {
        const { ano, mes } = req.params
        try {
            const despesasNoMes = await despesasService.pegarTodosRegistrosPorMes(ano, mes, attributes)
            return res.status(200).json(despesasNoMes)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    static async consultarUmaDespesa(req, res) {
        const { id } = req.params
        try {
            const umaDespesa = await despesasService.pegarUmRegistro(id, attributes)
            return res.status(200).json(umaDespesa)
        }
        catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    static async atualizarDespesa(req, res) {
        const { id } = req.params
        const novasInfos = req.body
        try {
            await despesasService.atualizarRegistro(novasInfos, id)
            const despesaAtualizada = await despesasService.pegarUmRegistro(id)
            return res.status(200).json(despesaAtualizada)
        }
        catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    static async apagarDespesa(req, res) {
        const { id } = req.params
        try {
            await despesasService.apagarRegistro(id)
            res.status(200).json({ message: `Despesas de ID ${id} apagado.` })
        }
        catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

module.exports = DespesasController;