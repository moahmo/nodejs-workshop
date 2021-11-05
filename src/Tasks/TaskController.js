import {
  queryTaskDetails, queryTasks, removeTask, storeNewTask,
} from './TaskStorageService';

export async function getTasks(req, res) {
  try {
    const result = await queryTasks();

    res.send(result);
  } catch {
    res.sendStatus(400);
  }
}

export async function getTaskDetails(req, res) {
  try {
    const result = await queryTaskDetails(req.params.taskId);

    res.send(result);
  } catch {
    res.sendStatus(400);
  }
}

export async function createTask(req, res) {
  try {
    await storeNewTask(req.body);

    res.send({
      success: true,
    });
  } catch {
    res.sendStatus(400);
  }
}

export async function deleteTask(req, res) {
  try {
    const result = await removeTask(req.params.taskId);

    res.send(result);
  } catch {
    res.sendStatus(400);
  }
}

// export async function createTaskItem(req, res) {
//   console.log(req, res);
// }
//
// export async function updateTaskItem(req, res) {
//   console.log(req, res);
// }
