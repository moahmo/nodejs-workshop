const Joi = require('joi');

const taskSchema = Joi.object({
  name: Joi.string().required(),
});

const taskItemSchema = Joi.object({
  name: Joi.string().required(),
  done: Joi.boolean().required(),
});

const validateTask = async (body) => {
  await taskSchema.validateAsync(body);
};

const validateTaskItem = async (body) => {
  await taskItemSchema.validateAsync(body);
};

module.exports = {
  validateTask,
  validateTaskItem,
};
