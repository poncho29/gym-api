function logErrors (error, req, res, next) {
  console.log('log error')
  console.error(error);
  next(error); // Con el error se identifica que es tipo error
}

// Formatea el error
function errorHandler (error, req, res, next) {
  console.log('errorHandler')
  res.status(500).json({
    msg: error.message,
    stack: error.stack
  });
}

function boomErrorHandler (error, req, res, next) {
  if(error.isBoom) {
    const {output } = error;
    res.status(output.statusCode).json(output.payload);
  }

  next(error);
}

module.exports = { logErrors, errorHandler, boomErrorHandler }