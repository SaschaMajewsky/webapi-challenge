const express = require('express');

const dbActions = require('../data/helpers/actionModel.js');

const router = express.Router();

// GET ALL ACTIONS
router.get('/', async (req, res) => {
  try {
    const actions = await dbActions.get();
    res.status(200).json(actions);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'There was an error providing the actions.' });
  }
});

// CREATE NEW ACTION
router.post('/', async (req, res) => {
  const {
    body: { project_id, description, notes },
  } = req;

  if (!project_id || !description || !notes) {
    res.status(404).json({
      error:
        'Could not read required project_id and or description and or notes of the action.',
    });
  } else {
    try {
      const addedAction = await dbActions.insert({
        project_id,
        description,
        notes,
      });
      res.status(201).json(addedAction);
    } catch (error) {
      res.status(500).json({ error: 'There was an error adding the action.' });
    }
  }
});

// DELETE AN ACTION
router.delete('/:id', async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const successFlag = await dbActions.remove(id);
    successFlag > 0
      ? res.status(200).json({
          message: `The action with the ID: ${id} has been removed.`,
        })
      : res.status(404).json({
          error: `The action with the ID: ${id} could not been found.`,
        });
  } catch (error) {
    res.status(500).json({ error: 'There was an error removing the action.' });
  }
});

// UPDATE AN ACTION
router.put('/:id', async (req, res) => {
  const {
    body: { project_id, description, notes },
    params: { id },
  } = req;

  if (project_id && description && notes) {
    try {
      const updatedAction = await dbActions.update(id, {
        project_id,
        description,
        notes,
      });

      if (updatedAction) {
        res.status(200).json(updatedAction);
      } else {
        res.status(204).json({
          error: `The action with the ID: ${id} could not been found.`,
        });
      }
    } catch (error) {
      res.status(500).json({
        error: `There was an error updating the action with the ID: ${id}.`,
      });
    }
  } else {
    res.status(404).json({
      error:
        'Could not read required project_id and or description and or notes of the action.',
    });
  }
});

module.exports = router;
