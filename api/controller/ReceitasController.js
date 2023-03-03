const { ReceitasServices } = require('../services')
const { Op } = require('sequelize');
const receitasService = new ReceitasServices


class ReceitasController {
    static async criaReceita(req, res) {
        const novaReceita = req.body;
        try {
            const [ano, mes, dia] = novaReceita.data.split('-');
            novaReceita.data = new Date(ano, mes - 1, dia);

            const receitaExistente = await receitasService.pegaUmRegistro({
                descricao: novaReceita.descricao,
                data: {
                    [Op.and]: [
                        { [Op.gte]: new Date(ano, mes - 1, 1) },
                        { [Op.lt]: new Date(ano, mes, 0) }
                    ]
                }
            }
            );

            if (receitaExistente) {
                return res.status(400).json({ message: "Receita já cadastrada dentro do mês" })
            } else {
                const novaReceitaCriada = await receitasService.criaRegistro(novaReceita)
                return res.status(201).json(novaReceitaCriada)
            }
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async consultaReceitas(req, res) {
        try {
            const todasReceitas = await receitasService.pegaTodosRegistros({ attributes: ['descricao', 'valor', 'data'] })
            return res.status(200).json(todasReceitas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async consultaUmaReceita(req, res) {
        const { id } = req.params
        try {
            const umaReceita = await receitasService.pegaUmRegistro({ id: id }, { attributes: ['descricao', 'valor', 'data'] })
            if (umaReceita != null) {
                return res.status(200).json(umaReceita)
            } else {
                return res.status(400).json({ message: "Não existe receita com este ID" })
            }

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaReceita(req, res) {
        const { id } = req.params
        const novasInfos = req.body
        try {

            const [ano, mes, dia] = novasInfos.data.split('-');
            novasInfos.data = new Date(ano, mes - 1, dia);

            const receitaExistente = await receitasService.pegaUmRegistro({
                descricao: novasInfos.descricao,
                data: {
                    [Op.and]: [
                        { [Op.gte]: new Date(ano, mes - 1, 1) },
                        { [Op.lt]: new Date(ano, mes, 0) }
                    ]
                }
            });

            if (receitaExistente) {
                return res.status(400).json({ message: "Já existe uma receita com essa descrição dentro deste mês!" })
            } else {
                await receitasService.atualizaRegistro(novasInfos, { id: id })
                const receitaAtualizada = await receitasService.pegaUmRegistro({ id: id })
                return res.status(200).json(receitaAtualizada)
            }
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaReceita(req, res) {
        const { id } = req.params
        try {
            await receitasService.apagaRegistro({ id: id })
            return res.status(200).json({message: `Receita de ${id} deletada`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = ReceitasController;