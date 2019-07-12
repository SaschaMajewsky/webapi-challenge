const express = require('express');

const dbProjects = require('../data/helpers/projectModel.js');

const router = express.Router();

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

router.delete('/:id', async (req, res) => {
  /* console.log(req.params); */
  try {
    const successFlag = await dbProjects.remove(req.params.id);
    successFlag > 0
      ? res.status(200).json({ message: 'The project has been removed.' })
      : res.status(404).json({ error: 'The project could not be found.' });
  } catch (error) {
    res.status(500).json({ error: 'There was an error removing the project.' });
  }
});

module.exports = router;
