const express = require('express');
const router = express.Router();
const cupcakeModel = require('../models/cupcakeModel');

router.get('/', async (req, res) => {
  try {
    const todos = await cupcakeModel.getAll();
    console.log('Cupcakes encontrados:', todos);
    res.render('cupcakes', { cupcakes: todos });
  } catch (err) {
    console.error('Erro ao listar cupcakes:', err);
    res.render('cupcakes', { cupcakes: [] });
  }
});

router.get('/novo', (req, res) => {
  res.render('cupcake_form');
});

router.post('/novo', async (req, res) => {
  try {
    const data = req.body;
    await cupcakeModel.create({
      sabor: data.sabor,
      cobertura: data.cobertura,
      confeitos: data.confeitos,
      preco: parseFloat(data.preco) || 0
    });
    res.redirect('/cupcakes');
  } catch (err) {
    console.error('Erro ao cadastrar cupcake:', err);
    res.render('cupcake_form', { erro: 'Falha ao salvar o cupcake.' });
  }
});

router.post('/excluir/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await cupcakeModel.remove(id);
    res.redirect('/cupcakes');
  } catch (err) {
    console.error('Erro ao excluir cupcake:', err);
    res.render('cupcakes', { cupcakes: [] });
  }
});

module.exports = router;