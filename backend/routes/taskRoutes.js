const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Task = require('../models/taskModel');

const router = express.Router();

router.use(authMiddleware);

router.get('/:projectId', async (req, res) => {
  try {
    const tasks = await Task.getByProject(req.params.projectId);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks', error: err });
  }
});

router.post('/', async (req, res) => {
  const { title, status, projectId, assigneeId } = req.body;
  try {
    const task = await Task.create(title, status, projectId, assigneeId);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error creating task', error: err });
  }
});

router.patch('/:taskId', async (req, res) => {
  const { status } = req.body;
  try {
    const task = await Task.updateStatus(req.params.taskId, status);
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error updating task', error: err });
  }
});

module.exports = router;

