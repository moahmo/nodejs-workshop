const getTaskDonePercentage = async (task) => {
  if (task?.items) {
    const { items } = task;
    const numOfItems = items.length;

    const numOfDoneItems = items.filter((item) => item.done === true).length;

    return Number(((100 / numOfItems) * numOfDoneItems).toFixed(2));
  }

  return 0;
};

module.exports = {
  getTaskDonePercentage,
};
