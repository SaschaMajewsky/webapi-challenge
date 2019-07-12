const express = require('express');

const dbProjects = require('../data/helpers/projectModel.js');

const router = express.Router();

// GET ALL PROJECTS
router.get('/', async (req, res) => {
  try {
    const projects = await dbProjects.get();
    res.status(200).json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'There was an error providing the projects.' });
  }
});

// GET ALL ACTIONS OF PROJECT BY PROJECT ID
router.get('/:id/actions', async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const projectActions = await dbProjects.getProjectActions(id);

    if (projectActions.length) {
      res.status(200).json(projectActions);
    } else {
      res.status(404).json({
        message: `The project with the ID: ${id} has no attached actions.`,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: `There was an error getting the actions of the project with the ID: ${id}`,
    });
  }
});

// CREATE NEW PROJECT
router.post('/', async (req, res) => {
  const {
    body: { name, description },
  } = req;

  if (!name || !description) {
    res.status(404).json({
      error: 'Could not read required name and or description of the project.',
    });
  } else {
    try {
      const addedProject = await dbProjects.insert(req.body);
      res.status(201).json(addedProject);
    } catch (error) {
      res.status(500).json({ error: 'There was an error adding the project.' });
    }
  }
});

// DELETE A PROJECT
router.delete('/:id', async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const successFlag = await dbProjects.remove(id);
    successFlag > 0
      ? res.status(200).json({
          message: `The project with the ID: ${id} has been removed.`,
        })
      : res.status(404).json({
          error: `The project with the ID: ${id} could not been found.`,
        });
  } catch (error) {
    res.status(500).json({ error: 'There was an error removing the project.' });
  }
});

// UPDATE A PROJECT
router.put('/:id', async (req, res) => {
  const {
    body: { name, description },
    params: { id },
  } = req;

  if (name && description) {
    try {
      const updatedProject = await dbProjects.update(id, {
        name,
        description,
      });

      if (updatedProject) {
        res.status(200).json(updatedProject);
      } else {
        res.status(204).json({
          error: `The project with the ID: ${id} could not been found.`,
        });
      }
    } catch (error) {
      res.status(500).json({
        error: `There was an error updating the project with the ID: ${id}.`,
      });
    }
  } else {
    res.status(404).json({
      error: 'Could not read required name and or description of the project.',
    });
  }
});

module.exports = router;
