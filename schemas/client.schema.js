const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string();
const lastname = Joi.string();
const gender = Joi.string();

const createClientSchema = Joi.object({
  name: name.required(),
  lastname: lastname.required(),
  gender: gender.required(),
});

const updateClientSchema = Joi.object({
  name: name,
  lastname: lastname,
  gender: gender
});

const getClientSchema = Joi.object({
  id: id.required(),
});

module.exports = { createClientSchema, updateClientSchema, getClientSchema }
