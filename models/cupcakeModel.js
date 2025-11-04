const db = require('../db/connection').db;

function create(cupcake) {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO Cupcake (sabor, cobertura, confeitos, preco) VALUES (?, ?, ?, ?)',
      [cupcake.sabor, cupcake.cobertura, cupcake.confeitos, cupcake.preco],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });
}

function getAll() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM Cupcake', (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function getById(id) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM Cupcake WHERE id_cupcake = ?', [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM Cupcake WHERE id_cupcake = ?', [id], function (err) {
      if (err) reject(err);
      else resolve(this.changes);
    });
  });
}

module.exports = { create, getAll, getById, remove };
