// eslint-disable-next-line import/prefer-default-export
export function getTaskDonePercentage(task) {
  if (task?.items) {
    const { items } = task;
    const numOfItems = items.length;

    const numOfDoneItems = items.filter((item) => item.done === true).length;

    return Number(((100 / numOfItems) * numOfDoneItems).toFixed(2));
  }

  return 0;
}
