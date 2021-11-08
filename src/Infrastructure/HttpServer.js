const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const taskRouter = require('../Tasks/TaskRouter');

const server = express();
const port = Number(process.env.PORT || 3010);

module.exports = {
  start() {
    server.use(helmet());
    server.use(cors({ origin: true, credentials: true }));
    server.use(express.json());

    server.get('/', (req, res) => { res.json({ port }); });
    server.use('/tasks', taskRouter);

    server.listen(port, () => {
      console.log(`Listening on port: ${port}`);
    });
  },
};
