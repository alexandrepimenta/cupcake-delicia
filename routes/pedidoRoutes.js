const express = require('express');
const router = express.Router();
const pedidoModel = require('../models/pedidoModel');
const cupcakeModel = require('../models/cupcakeModel');

// Listar pedidos
router.get('/', async (req, res) => {
  try {
    const pedidos = await pedidoModel.getAll();
    res.render('pedidos', { pedidos });
  } catch (err) {
    console.error('Erro ao listar pedidos:', err);
    res.render('pedidos', { pedidos: [] });
  }
});

// Formulário de novo pedido
router.get('/novo', async (req, res) => {
  try {
    const cupcakes = await cupcakeModel.getAll();
    res.render('pedido_form', { cupcakes });
  } catch (err) {
    console.error('Erro ao carregar cupcakes:', err);
    res.render('pedido_form', { cupcakes: [] });
  }
});

// Cadastrar novo pedido
router.post('/novo', async (req, res) => {
  try {
    const data = req.body;
    const clienteId = parseInt(data.id_cliente);
    const dataPedido = new Date().toISOString().split('T')[0];

    await pedidoModel.create({
      data_pedido: dataPedido,
      status: 'Em preparo',
      id_cliente: clienteId,
      total: 0
    });

    res.redirect('/pedidos');
  } catch (err) {
    console.error('Erro ao cadastrar pedido:', err);
    // Garante que cupcakes seja definido mesmo em caso de erro
    const cupcakes = await cupcakeModel.getAll().catch(() => []);
    res.render('pedido_form', { erro: 'Erro ao salvar pedido.', cupcakes });
  }
});

// Excluir pedido
router.post('/excluir/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await pedidoModel.remove(id);
    res.redirect('/pedidos');
  } catch (err) {
    console.error('Erro ao excluir pedido:', err);
    res.redirect('/pedidos');
  }
});

module.exports = router;