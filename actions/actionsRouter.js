const express = require('express');

const dbActions = require('../data/helpers/actionModel.js');

const router = express.Router();

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

module.exports = router;
