import Joi from 'joi';

export const eventSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
  status: Joi.boolean().default(true),
  start: Joi.date().required(),
  end: Joi.date().greater(Joi.ref('start')).required(),
});
