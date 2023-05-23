"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "medium_users",
      [
        {
          firstName: "DONTKILLME",
          lastName: "YOUCANTKILLME",
          status: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "YOUCANTKILLME",
          lastName: "DONTKILLME",
          status: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
