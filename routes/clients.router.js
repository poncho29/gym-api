const express = require('express');

const ClientService = require('../services/client.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createClientSchema,
  updateClientSchema,
  getClientSchema,
} = require('../schemas/client.schema');

const router = express.Router();
const service = new ClientService();

router.get('/', async (req, res, next) => {
  try {
    const clients = service.find();
    res.json(clients);
  } catch (error) {
    next(error);
  }  
});

router.get('/:id', 
  validatorHandler(getClientSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const client = await service.findOne(id);
      res.json(client);
    } catch (error) {
      next(error);
    }  
});

router.post('/',
  validatorHandler(createClientSchema, 'body'),
  async (req, res) => {
  const body = req.body;
  const newClient = await service.create(body);

  res.status(201).json({
    msg: 'usuario creado con exito',
    data: newClient,
  });
});

router.patch('/:id',
  validatorHandler(getClientSchema, 'params'),
  validatorHandler(updateClientSchema, 'body'),
  async(req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const client = await service.update(id, body);

    res.json({
      msg: 'client updated successfully',
      data: client,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', 
  validatorHandler(getClientSchema, 'params'),
  async(req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);

      res.status(200).json({
        msg: 'client delete successfully',
        id,
      });
    } catch (error) {
      next(error);
    }
});

module.exports = router;
