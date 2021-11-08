const { v4: uuid } = require('uuid');
const { query } = require('../Infrastructure/DatabaseConnection');

const queryTasks = async () => query('tasks').find({}).toArray();

const queryTaskDetails = async (taskId) => query('tasks').findOne({
  _id: taskId,
});

const storeNewTask = async (task) => query('tasks').insertOne({
  _id: uuid(),
  ...task,
});

const removeStoredTask = async (taskId) => query('tasks').deleteOne({
  _id: taskId,
});

const storeNewTaskItem = async (taskId, item) => query('tasks').updateOne({
  _id: taskId,
}, {
  $push: {
    items: {
      id: uuid(),
      ...item,
    },
  },
});

const updateStoredTaskItem = async (taskId, itemId, updatedItem) => query('tasks').updateOne({
  _id: taskId,
  'items.id': itemId,
}, {
  $set: {
    'items.$.done': updatedItem.done,
    'items.$.name': updatedItem.name,
  },
});

module.exports = {
  queryTasks,
  queryTaskDetails,
  storeNewTask,
  removeStoredTask,
  storeNewTaskItem,
  updateStoredTaskItem,
};
