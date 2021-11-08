const { v4: uuid } = require('uuid');
const { query } = require('../Infrastructure/DatabaseConnection');

const queryTasks = async ({
  limit,
  offset,
}) => query('tasks')
  .find({})
  .skip(offset)
  .limit(limit)
  .toArray();

const queryTaskDetails = async (taskId) => query('tasks').findOne({
  _id: taskId,
});

const storeNewTask = async (task) => query('tasks').insertOne({
  _id: uuid(),
  createdAt: new Date(),
  updatedAt: new Date(),
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
      updatedAt: new Date(),
      ...item,
    },
  },
});

const updateStoredTaskItem = async (taskId, itemId, updatedItem) => query('tasks').updateOne({
  _id: taskId,
  'items.id': itemId,
}, {
  $set: {
    updatedAt: new Date(),
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
