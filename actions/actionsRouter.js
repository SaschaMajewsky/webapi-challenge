const express = require('express');

const dbActions = require('../data/helpers/actionModel.js');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('I am the action route');
});
module.exports = router;
