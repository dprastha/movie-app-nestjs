import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.number().default(3000).required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.string().default(3306).required(),
  // DB_PASSWORD: Joi.string(),
  DB_USERNAME: Joi.string().required(),
  DB_NAME: Joi.string().required(),
});
