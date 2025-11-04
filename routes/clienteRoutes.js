const express = require('express');
const router = express.Router();
const clienteModel = require('../models/clienteModel');
const pedidoModel = require('../models/pedidoModel');

// Listar clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await clienteModel.getAll();
    res.render('clientes', { clientes });
  } catch (err) {
    console.error('Erro ao listar clientes:', err);
    res.render('clientes', { clientes: [] });
  }
});

// Formulário de novo cliente
router.get('/novo', (req, res) => {
  res.render('cliente_form');
});

// Cadastrar novo cliente
router.post('/novo', async (req, res) => {
  try {
    const data = req.body;
    await clienteModel.create({
      nome: data.nome,
      email: data.email,
      telefone: data.telefone,
      endereco: data.endereco
    });
    res.redirect('/clientes');
  } catch (err) {
    console.error('Erro ao cadastrar cliente:', err);
    res.render('cliente_form', { erro: 'Erro ao salvar o cliente.' });
  }
});

// Excluir cliente
router.post('/excluir/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Verifica se o cliente tem pedidos
    const pedidos = await pedidoModel.getAll();
    const temPedidos = pedidos.some(p => p.id_cliente === parseInt(id));

    if (temPedidos) {
      console.log(`Cliente ${id} possui pedidos e não pode ser excluído.`);
      return res.redirect('/clientes');
    }

    await clienteModel.remove(id);
    res.redirect('/clientes');
  } catch (err) {
    console.error('Erro ao excluir cliente:', err);
    res.redirect('/clientes');
  }
});

module.exports = router;