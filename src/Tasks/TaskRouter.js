const { Router } = require('express');
const taskController = require('./TaskController');

const taskRouter = Router();

taskRouter.get('/', taskController.getTasks);
taskRouter.post('/', taskController.createTask);
taskRouter.get('/:taskId', taskController.getTaskDetails);
taskRouter.delete('/:taskId', taskController.deleteTask);
taskRouter.post('/:taskId/items', taskController.createTaskItem);
taskRouter.put('/:taskId/items/:itemId', taskController.updateTaskItem);

module.exports = taskRouter;
