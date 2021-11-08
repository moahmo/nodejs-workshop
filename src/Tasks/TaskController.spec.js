const taskController = require('./TaskController');

jest.mock('./TaskStorageService');

describe('TaskController', () => {
  it('should have valid functions', () => {
    expect(typeof taskController.getTasks).toEqual('function');
    expect(typeof taskController.getTaskDetails).toEqual('function');
    expect(typeof taskController.createTask).toEqual('function');
    expect(typeof taskController.deleteTask).toEqual('function');
    expect(typeof taskController.createTaskItem).toEqual('function');
    expect(typeof taskController.updateTaskItem).toEqual('function');
    expect(taskController.updateTaskItem instanceof Function).toBeTruthy();
  });
});
