const {
  queryTaskDetails,
  queryTasks,
  removeStoredTask,
  storeNewTask,
  storeNewTaskItem,
  updateStoredTaskItem,
} = require('./TaskStorageService');

const { validateTask, validateTaskItem } = require('./TaskValidationService');
const { getTaskDonePercentage } = require('./TaskService');

const getTasks = async (req, res) => {
  try {
    const data = await queryTasks();

    res.send({
      data,
    });
  } catch {
    res.sendStatus(400);
  }
};

const getTaskDetails = async (req, res) => {
  try {
    const result = await queryTaskDetails(req.params.taskId);

    res.send({
      percentageDone: getTaskDonePercentage(result),
      details: result,
    });
  } catch {
    res.sendStatus(400);
  }
};

const createTask = async (req, res) => {
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
};

const deleteTask = async (req, res) => {
  try {
    const result = await removeStoredTask(req.params.taskId);

    res.send(result);
  } catch {
    res.sendStatus(400);
  }
};

const createTaskItem = async (req, res) => {
  try {
    await validateTaskItem(req.body);
    const result = await storeNewTaskItem(req.params.taskId, req.body);

    res.send(result);
  } catch (error) {
    res.send(400, {
      error,
    });
  }
};

const updateTaskItem = async (req, res) => {
  try {
    await validateTaskItem(req.body);
    const result = await updateStoredTaskItem(req.params.taskId, req.params.itemId, req.body);

    res.send(result);
  } catch {
    res.sendStatus(400);
  }
};

module.exports = {
  getTasks,
  getTaskDetails,
  createTask,
  deleteTask,
  createTaskItem,
  updateTaskItem,
};
