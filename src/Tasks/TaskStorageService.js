import { query } from '../Infrastructure/DatabaseConnection';

export async function queryTasks() {
  return query('tasks').find({}).toArray();
}

export async function queryTaskDetails(taskId) {
  return query('tasks').find({
    _id: taskId,
  });
}

export async function storeNewTask(task) {
  return query('tasks').insertOne(task);
}

export async function removeTask(taskId) {
  return query('tasks').deleteOne({
    _id: taskId,
  });
}

// async function storeNewTaskItem(taskId) {
//   try {
//
//   } catch (e) {
//     throw e;
//   }
// }
//
// function storeTaskItemAsDone(taskId, itemId) {
//   try {
//
//   } catch (e) {
//     throw e;
//   }
// }
