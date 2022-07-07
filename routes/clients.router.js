const express = require('express');
const faker = require('faker');

const router = express.Router();

router.get('/', (req, res) => {
  const clients = [];

  for(let i=0; i < 50; i++) {
    clients.push({
      name: faker.name.firstName(),
      lastname: faker.name.lastName(),
      gender: faker.name.gender(),
    })
  }

  res.json(clients);
});

module.exports = router;
