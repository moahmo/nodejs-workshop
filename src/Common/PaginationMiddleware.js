const Joi = require('joi');

const paginationSchema = {
  page: Joi.number().min(1).required(),
  size: Joi.number().min(1).max(100).required(),
};

module.exports = async (req, res, next) => {
  try {
    const validationSchema = Joi.object(paginationSchema).unknown(true);

    const query = await validationSchema.validateAsync(req.query);
    const { page, size } = query;

    res.locals.pagination = {
      offset: (page - 1) * size,
      limit: size,
    };

    next();
  } catch (e) {
    console.log('error', e);
    res.sendStatus(400);
  }
};
