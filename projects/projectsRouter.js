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

module.exports = router;
