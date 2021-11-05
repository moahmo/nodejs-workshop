import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import taskRouter from '../Tasks/TaskRouter';

const server = express();
const port = process.env.PORT || 3010;

export default {
  start() {
    server.use(helmet());
    server.use(cors({ origin: true, credentials: true }));
    server.use(express.json());

    server.use('/tasks', taskRouter);

    server.listen(port, () => {
      console.log(`Listening on port: ${port}`);
    });
  },
};
