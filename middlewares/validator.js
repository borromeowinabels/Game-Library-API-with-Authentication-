const Joi = require('joi');

exports.signupSchema = Joi.object({
  email: Joi.string()
  .min(6)
  .max(60)
  .required()
  .email({
      tlds: { allow: ['com', 'net'] },
  }),
  password: Joi.string()
  .required()
  .pattern(new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*()_+=\\-{}\\[\\]:;"\'<>,.?/])[a-zA-Z0-9!@#$%^&*()_+=\\-{}\\[\\]:;"\'<>,.?/]{3,30}$'))
});

exports.signinSchema = Joi.object({
  email: Joi.string()
  .min(6)
  .max(60)
  .required()
  .email({
      tlds: { allow: ['com', 'net'] },
  }),
  password: Joi.string()
  .required()
  .pattern(new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*()_+=\\-{}\\[\\]:;"\'<>,.?/])[a-zA-Z0-9!@#$%^&*()_+=\\-{}\\[\\]:;"\'<>,.?/]{3,30}$'))
});

exports.createPostSchema = Joi.object({
  title: Joi.string().min(3).max(60).required(),
  genre: Joi.string().min(3).max(600).required(),
  platform: Joi.string().min(3).max(60).required(),
  releaseYear: Joi.number()
    .integer()
    .min(1950)
    .max(new Date().getFullYear())
    .required(),
  description: Joi.string().min(3).max(600).required(),
  userId: Joi.string().required(),
});