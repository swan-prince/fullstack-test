const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./rateables.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255),
    imageUrl JSON,
    likes BOOLEAN DEFAULT FALSE,
    contents TEXT
  )`);
});

module.exports = db;
