const express = require('express');

const actionsRouter = require('./actions/actionsRouter.js');
const projectsRouter = require('./projects/projectsRouter.js');

const server = express();

server.use(express.json());

server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

server.get('/', (req, res) => {
  res.send('Lambda School Sprint 11 Challenge');
});

module.exports = server;
