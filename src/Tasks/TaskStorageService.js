const { v4: uuid } = require('uuid');
const { query } = require('../Infrastructure/DatabaseConnection');

const queryTasks = async ({
  limit,
  offset,
}) => query('tasks')
  .find({})
  .skip(offset)
  .limit(limit)
  .project({
    _id: false,
    id: '$_id',
    name: true,
    createdAt: true,
    updatedAt: true,
    items: true,
  })
  .toArray();

const queryTaskDetails = async (taskId) => query('tasks').findOne({
  _id: taskId,
});

const storeNewTask = async (task) => {
  const taskId = uuid();

  await query('tasks').insertOne({
    _id: taskId,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...task,
  });

  return queryTaskDetails(taskId);
};

const removeStoredTask = async (taskId) => query('tasks').deleteOne({
  _id: taskId,
});

const storeNewTaskItem = async (taskId, item) => {
  const result = await query('tasks').findOneAndUpdate({
    _id: taskId,
  }, {
    $push: {
      items: {
        id: uuid(),
        ...item,
      },
    },
  }, {
    returnDocument: 'after',
  });

  return result?.value;
};

const updateStoredTaskItem = async (taskId, itemId, updatedItem) => {
  const result = await query('tasks').findOneAndUpdate({
    _id: taskId,
    'items.id': itemId,
  }, {
    $set: {
      'items.$.done': updatedItem.done,
      'items.$.name': updatedItem.name,
    },
  }, {
    returnDocument: 'after',
  });

  return result?.value;
};

module.exports = {
  queryTasks,
  queryTaskDetails,
  storeNewTask,
  removeStoredTask,
  storeNewTaskItem,
  updateStoredTaskItem,
};
