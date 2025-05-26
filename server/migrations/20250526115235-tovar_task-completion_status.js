'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      //статус сборки товара для поставки
    await queryInterface.addColumn(
      "tovar_for_tasks",
      "completion_status",
      {
        type: Sequelize.STRING,
        defaultValue: "default"
      }
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
