'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('Categories', [
      {
        name: "backlog",
        img: "../images/backlog.png",
        organization: '<==++all++==>',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "todo",
        img: "../images/to-do.png",
        organization: '<==++all++==>',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "doing",
        img: "../images/process.png",
        organization: '<==++all++==>',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: "done",
        img: "../images/done.png",
        organization: '<==++all++==>',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Categories', null, {})
  }
};
