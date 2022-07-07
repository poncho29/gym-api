const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    {
      id: 1,
      category: 'planes de gimnasio',
    },
    {
      id: 2,
      category: 'suplementos',
    }
  ]);
});

// app.get('/categories/:categoryId/products/:productId', (req, res) => {
//   const { categoryId, productId } = req.params;

//   res.json({
//     categoryId,
//     productId
//   })
// });

module.exports = router;
