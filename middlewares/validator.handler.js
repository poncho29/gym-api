const boom = require('@hapi/boom');

// Es middleware se basa en generar un nuevo middleware de manera
// dinamica utilizando los closure de JS
function validatorHandler (schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if(error) {
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler;