// controller/projectController.js
const Project = require('../models/projectModel');

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.getAll(req.user.id);
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching projects', error: err });
  }
};

exports.createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body.title, req.user.id);
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: 'Error creating project', error: err });
  }
};

