const taskService = require('./TaskService');

describe('TaskService', () => {
  it('should return zero value', () => {
    const result = taskService.getTaskDonePercentage({});

    expect(result).toEqual(0);
  });

  it('should calculate valid done percentage', () => {
    const result = taskService.getTaskDonePercentage({
      items: [
        { done: false },
        { done: true },
        { done: false },
      ],
    });

    expect(result).toEqual(33.33);
  });
});
