const express = require('express');
const ProjectsRouter = require('./data/routers/projectsRouter');
const ActionsRouter = require('./data/routers/actionsRouter');

const server = express();
const cors = require('cors');
server.use(cors());
server.use(express.json());
server.use('/api/actions', ActionsRouter);
server.use('/api/projects', ProjectsRouter);

server.get('/', (req, res) => {
    res.send('<p>API is live</p>');
});

module.exports = server;