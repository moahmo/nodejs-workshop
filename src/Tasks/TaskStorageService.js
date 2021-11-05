import { v4 as uuid } from 'uuid';
import { query } from '../Infrastructure/DatabaseConnection';

export async function queryTasks() {
  return query('tasks').find({}).toArray();
}

export async function queryTaskDetails(taskId) {
  return query('tasks').findOne({
    _id: taskId,
  });
}

export async function storeNewTask(task) {
  return query('tasks').insertOne({
    _id: uuid(),
    ...task,
  });
}

export async function removeStoredTask(taskId) {
  return query('tasks').deleteOne({
    _id: taskId,
  });
}

export async function storeNewTaskItem(taskId, item) {
  return query('tasks').updateOne({
    _id: taskId,
  }, {
    $push: {
      items: {
        id: uuid(),
        ...item,
      },
    },
  });
}

export async function updateStoredTaskItem(taskId, itemId, updatedItem) {
  return query('tasks').updateOne({
    _id: taskId,
    'items.id': itemId,
  }, {
    $set: {
      'items.$.done': updatedItem.done,
      'items.$.name': updatedItem.name,
    },
  });
}
