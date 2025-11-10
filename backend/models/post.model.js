const db = require('../config/db.js');

exports.getAll = (filter, page, pageSize, callback) => {
  const offset = (page - 1) * pageSize;
  const search = `%${filter}%`;

  db.all(
    `SELECT * FROM posts 
     WHERE title LIKE ?
     LIMIT ? OFFSET ?`,
    [search, pageSize, offset],
    callback
  );
};

exports.add = (item, callback) => {
  const { title, imageUrl, contents } = item;
  db.run('INSERT INTO posts (title, imageUrl, contents) VALUES (?, ?, ?)', [title, JSON.stringify(imageUrl), contents], callback);
};

exports.delete = (id, callback) => {
  db.run('DELETE FROM posts WHERE id = ?', [id], callback);
};

exports.getCount = (filter, callback) => {
  const search = `%${filter}%`;
  db.get(`SELECT COUNT(*) as total FROM posts WHERE title LIKE ?`, [search], callback);
};

exports.like = (id, callback) => {
  db.run('UPDATE posts SET likes = NOT likes WHERE id = ?', [id], callback);
};
