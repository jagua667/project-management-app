const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Project = require('../models/projectModel');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const projects = await Project.getAll(req.user.id);
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching projects', error: err });
  }
});

router.post('/', async (req, res) => {
  const { title } = req.body;
  try {
    const project = await Project.create(title, req.user.id);
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: 'Error creating project', error: err });
  }
});

module.exports = router;

