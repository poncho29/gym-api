const express = require('express');
const ProductService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('../schemas/product.schema');
const { getClientSchema } = require('../schemas/client.schema');

const router = express.Router();
const service = new ProductService();

router.get('/', async (req, res, next) => {
  try {
    const products = await service.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      // Aqui captura el error y se lo envia al middleware
      next(error);
    }
});

router.post('/', 
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);

      res.status(201).json({
        msg: 'product created successfully',
        data: newProduct,
      });
    } catch (error) {
      next(error);
    }  
});

router.patch('/:id', 
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);

    res.json({
      message: 'product updated successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', 
  validatorHandler(getClientSchema, 'params'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const product = await service.delete(id);

      res.json({
        message: 'product delete successfully',
        id,
      });
    } catch (error) {
      next(error);
    }
});

module.exports = router;
