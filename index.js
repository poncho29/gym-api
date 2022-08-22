const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3000;

app.use(express.json());

// Forma de definir quiene tiene acceso a la api
const whitelist = [];
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed'));
    }
  }
}
app.use(cors(options));

/* app.get('/', (req, res) => {
  res.send('Hola mundo')
}); */

routerApi(app);

// Los middlewares siempre deben ir despues del routing
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening in port ${port}`);
});
