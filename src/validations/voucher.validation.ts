import Joi from 'joi';

export const voucherRequestSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow('').optional(),
  startDate: Joi.date().required(),
  expireDate: Joi.date().greater(Joi.ref('startDate')).required(),
  value: Joi.number().positive().required(),
  isPercentage: Joi.boolean().default(false),
});
