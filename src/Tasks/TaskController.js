import {
  queryTaskDetails,
  queryTasks,
  removeStoredTask,
  storeNewTask,
  storeNewTaskItem, updateStoredTaskItem,
} from './TaskStorageService';
import {
  validateTask,
  validateTaskItem,
} from './TaskValidationService';
import { getTaskDonePercentage } from './TaskService';

export async function getTasks(req, res) {
  try {
    const data = await queryTasks();

    res.send({
      data,
    });
  } catch {
    res.sendStatus(400);
  }
}

export async function getTaskDetails(req, res) {
  try {
    const result = await queryTaskDetails(req.params.taskId);

    res.send({
      percentageDone: getTaskDonePercentage(result),
      details: result,
    });
  } catch {
    res.sendStatus(400);
  }
}

export async function createTask(req, res) {
  try {
    await validateTask(req.body);
    await storeNewTask(req.body);

    res.send({
      success: true,
    });
  } catch (error) {
    res.send(400, {
      error,
    });
  }
}

export async function deleteTask(req, res) {
  try {
    const result = await removeStoredTask(req.params.taskId);

    res.send(result);
  } catch {
    res.sendStatus(400);
  }
}

export async function createTaskItem(req, res) {
  try {
    await validateTaskItem(req.body);
    const result = await storeNewTaskItem(req.params.taskId, req.body);

    res.send(result);
  } catch (error) {
    res.send(400, {
      error,
    });
  }
}

export async function updateTaskItem(req, res) {
  try {
    await validateTaskItem(req.body);
    const result = await updateStoredTaskItem(req.params.taskId, req.params.itemId, req.body);

    res.send(result);
  } catch {
    res.sendStatus(400);
  }
}
