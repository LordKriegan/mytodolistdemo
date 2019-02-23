'use strict';

const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {

    let tasks = [];

    for(let i = 0; i < 30; i++){
      const task = {
        name: faker.hacker.verb(),
        description: faker.hacker.phrase(),
        completed: faker.random.arrayElement([0,1]),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      tasks.push(task);
    }

    return queryInterface.bulkInsert('Tasks', tasks, {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tasks', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};