module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};