const taskController = require('./TaskController');
const taskStorageService = require('./TaskStorageService');

jest.mock('./TaskStorageService');

const mockReq = () => {
  const req = {};

  req.body = jest.fn().mockReturnValue(req);
  req.params = jest.fn().mockReturnValue(req);

  return req;
};

const mockRes = () => {
  const res = {};

  res.send = jest.fn().mockReturnValue(res);
  res.sendStatus = jest.fn().mockReturnValue(res);

  return res;
};

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

  it('should have send called in getTasks', async () => {
    taskStorageService.queryTasks.mockResolvedValueOnce([]);

    const mockedReq = mockReq();
    const mockedRes = mockRes();

    await taskController.getTasks(mockedReq, mockedRes);

    expect(mockedRes.send).toHaveBeenCalledTimes(1);
    expect(mockedRes.send).toHaveBeenCalledWith({ data: [] });
  });

  it('should throw error in getTasks', async () => {
    taskStorageService.queryTasks.mockImplementationOnce(() => {
      throw new Error('MockError');
    });

    const mockedReq = mockReq();
    const mockedRes = mockRes();

    await taskController.getTasks(mockedReq, mockedRes);

    expect(mockedRes.sendStatus).toHaveBeenCalledTimes(1);
    expect(mockedRes.sendStatus).toHaveBeenCalledWith(400);
  });
});
