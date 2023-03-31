const { ReceitasServices } = require('../services')
const receitasService = new ReceitasServices
const { Op } = require('sequelize');

const attributes = ['descricao', 'valor', 'data']


class ReceitasController {
    static async criarReceita(req, res) {
        const novaReceita = req.body;
        try {
            const novaReceitaCriada = await receitasService.criarRegistro(novaReceita)
            return res.status(201).json(novaReceitaCriada)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    static async consultarReceitas(req, res) {
        const { descricao } = req.query
        try {
            const todasReceitas = await receitasService.pegarTodosRegistros(descricao, attributes)
            return res.status(200).json(todasReceitas)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    static async consultarPorMes(req, res) {
        const { ano, mes } = req.params
        try {
            const receitasNoMes = await receitasService.pegarTodosRegistrosPorMes(ano, mes, attributes)
            return res.status(200).json(receitasNoMes)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    static async consultarUmaReceita(req, res) {
        const { id } = req.params
        try {
            const umaReceita = await receitasService.pegarUmRegistro(id, attributes)
            return res.status(200).json(umaReceita)
        }
        catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    static async atualizarReceita(req, res) {
        const { id } = req.params
        const novasInfos = req.body
        try {
            await receitasService.atualizarRegistro(novasInfos, id)
            const receitaAtualizada = await receitasService.pegarUmRegistro(id)
            return res.status(200).json(receitaAtualizada)
        }
        catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    static async apagarReceita(req, res) {
        const { id } = req.params
        try {
            await receitasService.apagarRegistro(id)
            return res.status(200).json({ message: `Receita de ID ${id} deletada` })
        }
        catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

module.exports = ReceitasController;