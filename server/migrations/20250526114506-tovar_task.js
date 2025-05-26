'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // число на которое было измененно количество товара для поставки
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "tovar_for_tasks",
      "changed_cartons_required",
      {
        type: Sequelize.INTEGER,
        defaultValue: 0
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
