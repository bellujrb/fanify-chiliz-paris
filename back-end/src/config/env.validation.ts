import * as Joi from "joi";

export const validationSchema = Joi.object({
  PORT: Joi.number().required(),

  ENV: Joi.string().required(),
  ETH_PRIVATE_KEY: Joi.string().required(),

  TWITTER_API_KEY: Joi.string().required(),
  TWITTER_API_SECRET: Joi.string().required(),
  TWITTER_ACCESS_TOKEN: Joi.string().required(),
  TWITTER_ACCESS_SECRET: Joi.string().required(),

  SUPABASE_URL: Joi.string().required(),
  SUPABASE_SERVICE_ROLE_KEY: Joi.string().required(),

});
