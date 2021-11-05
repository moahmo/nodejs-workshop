import { Router } from 'express';
import {
  createTask,
  getTasks,
  getTaskDetails,
  updateTaskItem,
  deleteTask,
  createTaskItem,
} from './TaskController';

const taskRouter = Router();

taskRouter.get('/', getTasks);
taskRouter.post('/', createTask);
taskRouter.get('/:taskId', getTaskDetails);
taskRouter.delete('/:taskId', deleteTask);
taskRouter.post('/:taskId/items', createTaskItem);
taskRouter.patch('/:taskId/items/:itemId', updateTaskItem);

export default taskRouter;
