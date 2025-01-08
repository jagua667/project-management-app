// controller/taskController.js
const Task = require('../models/taskModel');

exports.getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.getByProject(req.params.projectId);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks', error: err });
  }
};

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(
      req.body.title,
      req.body.status,
      req.body.projectId,
      req.body.assigneeId
    );
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error creating task', error: err });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.updateStatus(req.params.taskId, req.body.status);
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error updating task', error: err });
  }
};

