const pool = require('../config/db');

const User = {
  findByEmail: async (email) => {
    const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return res.rows[0];
  },
  findById: async (id) => {
    const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return res.rows[0];
  },
  create: async (email, passwordHash) => {
    const res = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [email, passwordHash]
    );
    return res.rows[0];
  },
};

module.exports = User;

