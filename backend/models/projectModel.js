const pool = require('../config/db');

const Project = {
  getAll: async (userId) => {
    const res = await pool.query('SELECT * FROM projects WHERE owner_id = $1', [userId]);
    return res.rows;
  },
  create: async (title, ownerId) => {
    const res = await pool.query(
      'INSERT INTO projects (title, owner_id) VALUES ($1, $2) RETURNING *',
      [title, ownerId]
    );
    return res.rows[0];
  },
};

module.exports = Project;

