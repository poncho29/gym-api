const faker = require('faker');
const boom = require('@hapi/boom');

class ClientService {
  constructor() {
    this.clients = [];
    this.generate();
  }

  generate() {
    const limit = 20;
    for(let i=0; i < limit; i++) {
      this.clients.push({
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        gender: faker.name.gender(),
      })
    }
  }

  find() {
    return this.clients;
  }

  findOne(id) {
    const index = this.clients.findIndex(item => item.id === id);
    if(index === -1) {
      throw boom.notFound('client not found')
    }

    return this.clients.find(client => client.id === id);
  }

  create(data) {
    const newClient = {
      id: faker.datatype.uuid(),
      ... data,
    }
    this.clients.push(newClient);
    return newClient;
  }

  update(id, changes) {
    const index = this.clients.findIndex(item => item.id === id);
    if(index === -1) {
      throw boom.notFound('client not found')
    }

    const client = this.clients[index];
    this.clients[index] = {
      ...client,
      ...changes
    }
    return this.clients[index];
  }

  delete(id) {
    const index = this.clients.findIndex(item => item.id === id);
    if(index === -1) {
      throw boom.notFound('client not found')
    }

    this.clients.splice(index, 1);
    return { id };
  }
}

module.exports = ClientService;