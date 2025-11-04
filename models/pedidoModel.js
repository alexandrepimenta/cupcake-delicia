const db = require('../db/connection').db;

// Cria um novo pedido
function create(pedido) {
  return new Promise((resolve, reject) => {
    console.log('📦 Inserindo novo pedido:', pedido);

    db.run(
      `INSERT INTO Pedido (data_pedido, status, id_cliente, total)
       VALUES (?, ?, ?, ?)`,
      [pedido.data_pedido, pedido.status, pedido.id_cliente, pedido.total],
      function (err) {
        if (err) {
          console.error('❌ Erro ao inserir pedido:', err);
          reject(err);
        } else {
          console.log('✅ Pedido inserido com ID:', this.lastID);
          resolve(this.lastID);
        }
      }
    );
  });
}

// Lista todos os pedidos
function getAll() {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT p.*, c.nome AS cliente_nome 
       FROM Pedido p 
       LEFT JOIN Cliente c ON p.id_cliente = c.id_cliente`,
      (err, rows) => {
        if (err) {
          console.error('❌ Erro ao buscar pedidos:', err);
          reject(err);
        } else {
          console.log('📋 Pedidos encontrados:', rows);
          resolve(rows);
        }
      }
    );
  });
}

// Remove pedido
function remove(id) {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM Pedido WHERE id_pedido = ?', [id], function (err) {
      if (err) reject(err);
      else resolve(this.changes);
    });
  });
}

module.exports = { create, getAll, remove };