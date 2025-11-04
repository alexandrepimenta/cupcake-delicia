const db = require('../db/connection').db;

function create(cliente) {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO Cliente (nome, email, telefone, endereco) VALUES (?, ?, ?, ?)',
      [cliente.nome, cliente.email, cliente.telefone, cliente.endereco],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });
}

function getAll() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM Cliente', (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM Cliente WHERE id_cliente = ?', [id], function (err) {
      if (err) reject(err);
      else resolve(this.changes);
    });
  });
}

module.exports = { create, getAll, remove };