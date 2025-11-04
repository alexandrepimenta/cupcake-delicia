const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, '../data/cupcake.db');
const db = new sqlite3.Database(dbPath);

function init() {
  db.serialize(() => {
    // Cria tabela Cupcake
    db.run(`CREATE TABLE IF NOT EXISTS Cupcake (
      id_cupcake INTEGER PRIMARY KEY AUTOINCREMENT,
      sabor TEXT NOT NULL,
      cobertura TEXT,
      confeitos TEXT,
      preco REAL
    )`);

    // Cria tabela Cliente
    db.run(`CREATE TABLE IF NOT EXISTS Cliente (
      id_cliente INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT,
      telefone TEXT,
      endereco TEXT
    )`);

    // Cria tabela Pedido
    db.run(`CREATE TABLE IF NOT EXISTS Pedido (
      id_pedido INTEGER PRIMARY KEY AUTOINCREMENT,
      data_pedido TEXT,
      status TEXT,
      id_cliente INTEGER,
      total REAL,
      FOREIGN KEY (id_cliente) REFERENCES Cliente (id_cliente)
    )`);

    // Cria tabela Item_Pedido (futura melhoria)
    db.run(`CREATE TABLE IF NOT EXISTS Item_Pedido (
      id_item INTEGER PRIMARY KEY AUTOINCREMENT,
      id_pedido INTEGER,
      id_cupcake INTEGER,
      quantidade INTEGER,
      FOREIGN KEY (id_pedido) REFERENCES Pedido (id_pedido),
      FOREIGN KEY (id_cupcake) REFERENCES Cupcake (id_cupcake)
    )`);
  });

  console.log('✅ Banco de dados inicializado com sucesso.');
}

module.exports = { db, init };