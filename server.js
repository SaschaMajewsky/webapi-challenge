const express = require('express');

const actionsRouter = require('./actions/actionsRouter.js');

const server = express();

server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
  res.send('Lambda School Sprint 11 Challenge');
});

module.exports = server;
