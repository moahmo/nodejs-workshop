import Joi from 'joi';

const taskSchema = Joi.object({
  name: Joi.string().required(),
});

const taskItemSchema = Joi.object({
  name: Joi.string().required(),
  done: Joi.boolean().required(),
});

export async function validateTask(body) {
  await taskSchema.validateAsync(body);
}

export async function validateTaskItem(body) {
  await taskItemSchema.validateAsync(body);
}
