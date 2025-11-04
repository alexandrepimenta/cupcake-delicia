// ======== CUPCAKE DELÍCIA - SERVIDOR PRINCIPAL ========

// Importações
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { init } = require('./db/connection');

// Inicializa o app
const app = express();
const PORT = process.env.PORT || 3000;

// ======== MIDDLEWARES ========
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ======== VIEW ENGINE ========
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ======== CONEXÃO COM BANCO ========
init();

// ======== ROTAS ========
const cupcakeRoutes = require('./routes/cupcakeRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');

app.use('/cupcakes', cupcakeRoutes);
app.use('/clientes', clienteRoutes);
app.use('/pedidos', pedidoRoutes);

// ======== ROTA PRINCIPAL ========
app.get('/', (req, res) => {
  res.render('index');
});

// ======== INICIALIZAÇÃO DO SERVIDOR ========
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
