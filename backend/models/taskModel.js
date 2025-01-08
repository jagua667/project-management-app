const pool = require('../config/db');

const Task = {
  getByProject: async (projectId) => {
    const res = await pool.query('SELECT * FROM tasks WHERE project_id = $1', [projectId]);
    return res.rows;
  },
  create: async (title, status, projectId, assigneeId) => {
    const res = await pool.query(
      'INSERT INTO tasks (title, status, project_id, assignee_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, status, projectId, assigneeId]
    );
    return res.rows[0];
  },
  updateStatus: async (taskId, status) => {
    const res = await pool.query(
      'UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *',
      [status, taskId]
    );
    return res.rows[0];
  },
};

module.exports = Task;

